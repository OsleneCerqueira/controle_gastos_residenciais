import type { Person, PersonSummary, OverallSummary, CreatePersonRequest } from "../types/person";

const apiUrl = import.meta.env.VITE_API_URL;

const peopleEndpoint = "/api/Person";

const peopleSummaryEndpoint = "/api/Summary/people";

const overallSummaryEndpoint = "/api/Summary/overall";

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


export async function getOverallSummary(): Promise<OverallSummary> {
  if (!apiUrl) {
    throw new Error(
      "A variável VITE_API_URL não foi configurada."
    );
  }

  const response = await fetch(
    `${apiUrl}${overallSummaryEndpoint}`
  );

  if (!response.ok) {
    throw new Error(
      `Não foi possível buscar o resumo geral. Status: ${response.status}.`
    );
  }

  const overallSummary: OverallSummary = await response.json();

  return overallSummary;
}



export async function createPerson(
  person: CreatePersonRequest): Promise<void> {
  if (!apiUrl) {
    throw new Error("A variável VITE_API_URL não foi configurada.");
  }

  const response = await fetch(`${apiUrl}${peopleEndpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }
  );

  if (!response.ok) {
    throw new Error(`Não foi possível cadastrar a pessoa. Status: ${response.status}.`
    );
  }
}