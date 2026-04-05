export type Role = "ADMIN" | "VIEWER";

export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  date: string; // ISO string
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface ChartData {
  name: string;
  value: number;
}