import { apiRequest } from "../../../shared/api/httpClient";
import type { Transaction, CreateTransactionRequest } from "../types/transaction";

const transactionEndpoint = "/api/Transaction";

export function getTransactionsByPersonId(personId: number): Promise<Transaction[]> {
  return apiRequest<Transaction[]>(`${transactionEndpoint}/person/${personId}`, {
    errorMessage: "Não foi possível buscar as transações da pessoa.",
  });
}

export async function createTransaction(transaction: CreateTransactionRequest): Promise<void> {
  await apiRequest<void>(transactionEndpoint, {
    method: "POST",
    json: transaction,
    errorMessage: "Não foi possível cadastrar a transação.",
  });
}