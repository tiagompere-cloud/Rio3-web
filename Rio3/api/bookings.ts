import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  squareFetch,
  getSquareConfig,
  findOrCreateCustomer,
  cors,
} from "./_square.js";

interface SquareError extends Error {
  status?: number;
  squareErrors?: unknown;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (cors(req, res)) return;
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { slot, patient, note } = req.body || {};

    if (!slot?.startAt || !slot?.teamMemberId || !slot?.serviceVariationId) {
      res.status(400).json({ error: "Invalid slot" });
      return;
    }
    if (!patient?.email || !patient?.first || !patient?.last) {
      res.status(400).json({ error: "Missing patient details" });
      return;
    }

    const { locationId } = getSquareConfig();

    const customerId = await findOrCreateCustomer({
      email: patient.email,
      first: patient.first,
      last: patient.last,
      phone: patient.phone,
    });

    const tags: string[] = [];
    if (patient.newPatient) tags.push("NEW PATIENT");
    // Record TCPA texting consent with the booking so there is a durable
    // record of the opt-in (state + timestamp + consent text version).
    if (patient.textingConsent) {
      tags.push(
        `SMS CONSENT ${patient.consentTimestamp || ""} (v${patient.consentTextVersion || ""})`.trim()
      );
    } else {
      tags.push("NO SMS CONSENT");
    }
    if (note?.trim()) tags.push(note.trim());
    const customerNote = tags.join(" · ").slice(0, 4096);

    const booking = await squareFetch("/v2/bookings", {
      body: {
        idempotency_key: `bk-${customerId}-${slot.startAt}`,
        booking: {
          start_at: slot.startAt,
          location_id: locationId,
          customer_id: customerId,
          customer_note: customerNote || undefined,
          appointment_segments: [
            {
              team_member_id: slot.teamMemberId,
              service_variation_id: slot.serviceVariationId,
              service_variation_version: slot.serviceVariationVersion,
              duration_minutes: slot.durationMinutes,
            },
          ],
        },
      },
    });

    res.status(200).json({ booking: booking.booking });
  } catch (err) {
    const e = err as SquareError;
    console.error("booking error:", e);
    res.status(e.status || 500).json({
      error: e.message || "Booking failed",
      details: e.squareErrors,
    });
  }
}
