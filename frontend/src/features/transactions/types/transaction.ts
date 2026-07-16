export const TransactionType = {
  Expense: "Expense",
  Revenue: "Revenue",
} as const;

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: TransactionType;
  createdAt: string;
  personId: number;
  personName: string;
}

export interface CreateTransactionRequest {
  description: string;
  value: number;
  type: TransactionType;
  personId: number;
}

export interface TransactionPage {
  items: Transaction[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}