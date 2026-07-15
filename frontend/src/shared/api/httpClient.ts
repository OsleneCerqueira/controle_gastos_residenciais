const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("A variável VITE_API_URL não foi configurada.");
}

interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  errorMessage: string;
  json?: unknown;
}

export async function apiRequest<T>(
  endpoint: string,
  { errorMessage, json, headers, ...options }: ApiRequestOptions): Promise<T> {
  const requestHeaders = new Headers(headers);

  requestHeaders.set("Accept", "application/json");

  if (json !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers: requestHeaders,
    body: json !== undefined ? JSON.stringify(json) : undefined,
  });

  if (!response.ok) {
    throw new Error(`${errorMessage} Status: ${response.status}.`);
  }

  const responseBody = await response.text();

  if (!responseBody) {
    return undefined as T;
  }

  return JSON.parse(responseBody) as T;
}