import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDB } from '@/lib/db';
import { seedDatabase } from '@/lib/mockData';
import { Transaction } from '@/types';

// --- Existing Fetch Logic ---
const fetchTransactions = async (): Promise<Transaction[]> => {
  await seedDatabase();
  const db = await getDB();
  if (!db) return [];
  await new Promise(resolve => setTimeout(resolve, 500)); // Network simulation
  return db.getAll('transactions');
};

export function useTransactions() {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  const summary = query.data?.reduce(
    (acc, curr) => {
      if (curr.type === 'INCOME') acc.income += curr.amount;
      if (curr.type === 'EXPENSE') acc.expense += curr.amount;
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  ) || { income: 0, expense: 0, balance: 0 };

  return { ...query, summary };
}

// --- NEW: Mutation Logic ---
export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTx: Omit<Transaction, 'id'>) => {
      const db = await getDB();
      if (!db) throw new Error("Database not initialized");
      
      const transaction: Transaction = {
        ...newTx,
        id: crypto.randomUUID(), // Generate unique ID
      };
      
      await db.add('transactions', transaction);
      return transaction;
    },
    onSuccess: () => {
      // This tells React Query: "The data changed! Refetch the table and charts!"
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}