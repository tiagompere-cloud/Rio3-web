import type { VercelRequest, VercelResponse } from "@vercel/node";
import { squareFetch, getSquareConfig, cors } from "./_square.js";

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
    const { serviceVariationId, daysAhead = 14 } = req.body || {};
    if (!serviceVariationId) {
      res.status(400).json({ error: "serviceVariationId required" });
      return;
    }

    const { locationId } = getSquareConfig();

    const now = new Date();
    const startAt = new Date(now.getTime() + 60 * 60 * 1000);
    const endAt = new Date(
      now.getTime() + Math.min(daysAhead, 31) * 24 * 60 * 60 * 1000
    );

    const data = await squareFetch("/v2/bookings/availability/search", {
      body: {
        query: {
          filter: {
            start_at_range: {
              start_at: startAt.toISOString(),
              end_at: endAt.toISOString(),
            },
            location_id: locationId,
            segment_filters: [
              {
                service_variation_id: serviceVariationId,
              },
            ],
          },
        },
      },
    });

    const slots = (data.availabilities || []).map((a: any) => {
      const seg = a.appointment_segments?.[0] || {};
      return {
        startAt: a.start_at,
        teamMemberId: seg.team_member_id,
        serviceVariationId: seg.service_variation_id,
        serviceVariationVersion: seg.service_variation_version,
        durationMinutes: seg.duration_minutes,
      };
    });

    res.status(200).json({ slots });
  } catch (err) {
    const e = err as SquareError;
    console.error("availability error:", e);
    res.status(e.status || 500).json({
      error: e.message || "Availability lookup failed",
      details: e.squareErrors,
    });
  }
}
