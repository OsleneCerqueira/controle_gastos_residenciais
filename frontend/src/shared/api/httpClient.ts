const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("A variável VITE_API_URL não foi configurada.");
}

interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  errorMessage: string;
  json?: unknown;
}

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

function getApiErrorMessage(responseBody: string, fallbackMessage: string): string {
  if (!responseBody) {
    return fallbackMessage;
  }

  try {
    const errorResponse = JSON.parse(responseBody) as ApiErrorResponse | string;

    if (typeof errorResponse === "string") {
      return errorResponse;
    }

    if (errorResponse.message) {
      return errorResponse.message;
    }

    const validationMessage = Object.values(errorResponse.errors ?? {}).flat()[0];

    return validationMessage ?? fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  { errorMessage, json, headers, ...options }: ApiRequestOptions): Promise<T> {
  const requestHeaders = new Headers(headers);

  requestHeaders.set("Accept", "application/json");

  if (json !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(`${apiUrl}${endpoint}`, {
      ...options,
      headers: requestHeaders,
      body: json !== undefined ? JSON.stringify(json) : undefined,
    });
  } catch {
    throw new Error(errorMessage);
  }

  const responseBody = await response.text();

  if (!response.ok) {
    throw new Error(getApiErrorMessage(responseBody, errorMessage));
  }

  if (!responseBody) {
    return undefined as T;
  }

  return JSON.parse(responseBody) as T;
}