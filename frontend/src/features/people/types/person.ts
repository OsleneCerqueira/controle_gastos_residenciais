export interface Person {
  id: number;
  name: string;
  age: number;
}

export interface PersonSummary {
  personId: number;
  personName: string;
  totalRevenue: number;
  totalExpenses: number;
  balance: number;
}

export interface OverallSummary {
  totalRevenue: number;
  totalExpenses: number;
  netBalance: number;
}