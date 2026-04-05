import { TransactionTable } from "@/features/transactions/TransactionTable";
import { TransactionFilters } from "@/features/transactions/TransactionFilters";

export default function TransactionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <p className="text-muted-foreground">
          View, search, and manage your financial history.
        </p>
      </div>
      
      <TransactionFilters />
      <TransactionTable />
    </div>
  );
}