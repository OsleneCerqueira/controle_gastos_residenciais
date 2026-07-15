import type { Person, PersonSummary } from "../types/person";

const apiUrl = import.meta.env.VITE_API_URL;

const peopleEndpoint = "/api/Person";

const peopleSummaryEndpoint = "/api/Summary/people";

export async function getPeople(): Promise<Person[]> {
  if (!apiUrl) {
    throw new Error("A variável VITE_API_URL não foi configurada.");
  }

  const response = await fetch(`${apiUrl}${peopleEndpoint}`);

  if (!response.ok) {
    throw new Error(`Não foi possível buscar as pessoas. Status: ${response.status}.`);
  }

  const people: Person[] = await response.json();

  return people;
}


export async function getPeopleSummary(): Promise<PersonSummary[]> {
  if (!apiUrl) {
    throw new Error("A variável VITE_API_URL não foi configurada.");
  }

  const response = await fetch(`${apiUrl}${peopleSummaryEndpoint}`);

  if (!response.ok) {
    throw new Error(`Não foi possível buscar o resumo. Status: ${response.status}.`);
  }

  const peopleSummary: PersonSummary[] = await response.json();

  return peopleSummary;
}