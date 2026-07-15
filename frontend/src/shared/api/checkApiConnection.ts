const apiUrl = import.meta.env.VITE_API_URL;

const personEndpoint = "/api/Person";

export async function checkApiConnection(): Promise<void> {
  if (!apiUrl) {
    throw new Error( "A variável VITE_API_URL não foi configurada.");
  }

  const response = await fetch(`${apiUrl}${personEndpoint}`);

  if (!response.ok) {
    throw new Error( `A API respondeu com o status ${response.status}.`);
  }
}