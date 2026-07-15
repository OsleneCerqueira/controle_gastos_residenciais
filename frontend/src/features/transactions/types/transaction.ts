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
  personId: number;
  personName: string;
}