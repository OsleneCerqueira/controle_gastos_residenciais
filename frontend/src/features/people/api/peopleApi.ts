import type { Person, PersonSummary, OverallSummary, CreatePersonRequest } from "../types/person";
import { apiRequest } from "../../../shared/api/httpClient";

const peopleEndpoint = "/api/Person";

const peopleSummaryEndpoint = "/api/Summary/people";

const overallSummaryEndpoint = "/api/Summary/overall";


export function getPeople(): Promise<Person[]> {
  return apiRequest<Person[]>(peopleEndpoint, {
    errorMessage: "Não foi possível buscar as pessoas.",
  });
}

export function getPeopleSummary(): Promise<PersonSummary[]> {
  return apiRequest<PersonSummary[]>(peopleSummaryEndpoint, {
    errorMessage: "Não foi possível buscar o resumo das pessoas.",
  });
}

export function getOverallSummary(): Promise<OverallSummary> {
  return apiRequest<OverallSummary>(overallSummaryEndpoint, {
    errorMessage: "Não foi possível buscar o resumo geral.",
  });
}

export async function createPerson(person: CreatePersonRequest): Promise<void> {
  await apiRequest<void>(peopleEndpoint, {
    method: "POST",
    json: person,
    errorMessage: "Não foi possível cadastrar a pessoa.",
  });
}

export async function deletePerson(personId: number): Promise<void> {
  await apiRequest<void>(`${peopleEndpoint}/${personId}`, {
    method: "DELETE",
    errorMessage: "Não foi possível excluir a pessoa.",
  });
}

export function getPerson(personId: number): Promise<Person> {
  return apiRequest<Person>(`${peopleEndpoint}/${personId}`, {
    errorMessage: "Não foi possível buscar a pessoa.",
  });
}