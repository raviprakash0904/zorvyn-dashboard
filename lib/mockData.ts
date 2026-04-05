import { getDB } from './db';
import { Transaction } from '@/types';
import { subDays } from 'date-fns';

const CATEGORIES = {
  INCOME: ['Salary', 'Freelance', 'Investments'],
  EXPENSE: ['Food & Dining', 'Rent', 'Subscriptions', 'Transport', 'Utilities'],
};

export async function seedDatabase() {
  const db = await getDB();
  if (!db) return;

  const count = await db.count('transactions');
  if (count > 0) return; // DB already seeded

  const tx: Transaction[] = [];
  const now = new Date();

  // Generate 50 random transactions over the last 30 days
  for (let i = 0; i < 50; i++) {
    const isIncome = Math.random() > 0.7; // 30% chance of income
    const type = isIncome ? 'INCOME' : 'EXPENSE';
    const categoryList = CATEGORIES[type];
    
    tx.push({
      id: crypto.randomUUID(),
      date: subDays(now, Math.floor(Math.random() * 30)).toISOString(),
      amount: isIncome ? Math.floor(Math.random() * 5000) + 500 : Math.floor(Math.random() * 500) + 10,
      category: categoryList[Math.floor(Math.random() * categoryList.length)],
      type,
      description: `Mock ${type.toLowerCase()} transaction`,
    });
  }

  const txStore = db.transaction('transactions', 'readwrite').objectStore('transactions');
  await Promise.all(tx.map(t => txStore.add(t)));
}