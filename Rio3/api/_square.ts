import type { VercelRequest, VercelResponse } from "@vercel/node";

const SQUARE_API_VERSION = "2024-12-18";

interface SquareConfig {
  token: string;
  locationId: string;
  base: string;
}

interface SquareFetchOptions {
  method?: string;
  body?: unknown;
}

interface SquareError extends Error {
  status?: number;
  squareErrors?: Array<{ code?: string; detail?: string }>;
}

interface CustomerInfo {
  email: string;
  first: string;
  last: string;
  phone?: string;
}

export function getSquareConfig(): SquareConfig {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const env = (process.env.SQUARE_ENV || "production").toLowerCase();

  if (!token) throw new Error("Missing SQUARE_ACCESS_TOKEN env var");
  if (!locationId) throw new Error("Missing SQUARE_LOCATION_ID env var");

  const base =
    env === "sandbox"
      ? "https://connect.squareupsandbox.com"
      : "https://connect.squareup.com";

  return { token, locationId, base };
}

export async function squareFetch(
  path: string,
  { method = "POST", body }: SquareFetchOptions = {}
): Promise<any> {
  const { token, base } = getSquareConfig();
  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Square-Version": SQUARE_API_VERSION,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      data?.errors?.[0]?.detail ||
      data?.errors?.[0]?.code ||
      `Square ${path} returned ${res.status}`;
    const err: SquareError = new Error(msg);
    err.status = res.status;
    err.squareErrors = data?.errors;
    throw err;
  }
  return data;
}

export async function findOrCreateCustomer({
  email,
  first,
  last,
  phone,
}: CustomerInfo): Promise<string> {
  const search = await squareFetch("/v2/customers/search", {
    body: {
      query: {
        filter: { email_address: { exact: email } },
      },
      limit: 1,
    },
  });

  if (search.customers && search.customers.length > 0) {
    return search.customers[0].id;
  }

  const created = await squareFetch("/v2/customers", {
    body: {
      idempotency_key: `cust-${email}-${Date.now()}`,
      given_name: first,
      family_name: last,
      email_address: email,
      phone_number: phone,
    },
  });
  return created.customer.id;
}

export function cors(req: VercelRequest, res: VercelResponse): boolean {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}
