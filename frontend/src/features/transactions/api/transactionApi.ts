import { apiRequest } from "../../../shared/api/httpClient";
import type { TransactionPage, CreateTransactionRequest } from "../types/transaction";

const transactionEndpoint = "/api/Transaction";

export function getTransactionsByPersonId(
  personId: number,
  page = 1,
): Promise<TransactionPage> {
  return apiRequest<TransactionPage>(`${transactionEndpoint}/person/${personId}?page=${page}`, {
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