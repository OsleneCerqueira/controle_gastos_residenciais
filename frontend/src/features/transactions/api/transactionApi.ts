import { apiRequest } from "../../../shared/api/httpClient";
import type { Transaction } from "../types/transaction";

const transactionEndpoint = "/api/Transaction";

export function getTransactionsByPersonId(personId: number): Promise<Transaction[]> {
  return apiRequest<Transaction[]>(`${transactionEndpoint}/person/${personId}`, {
    errorMessage: "Não foi possível buscar as transações da pessoa.",
  });
}