"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { useStore } from "@/store/useStore";
import { useMemo } from "react";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

export function TransactionTable() {
  const { data: transactions, isLoading } = useTransactions();
  const { searchTerm, typeFilter, role } = useStore();

  // High-performance filtering and sorting
  const filteredData = useMemo(() => {
    if (!transactions) return [];

    return transactions
      .filter((tx) => {
        const matchesSearch = 
          tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "ALL" || tx.type === typeFilter;
        
        return matchesSearch && matchesType;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Newest first
  }, [transactions, searchTerm, typeFilter]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-card text-muted-foreground">
        No transactions found matching your criteria.
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            {/* ROLE-BASED UI: Hide Action column for Viewers */}
            {role === "ADMIN" && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="whitespace-nowrap">
                {format(new Date(tx.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="font-medium">{tx.description}</TableCell>
              <TableCell>{tx.category}</TableCell>
              <TableCell>
                <Badge variant={tx.type === "INCOME" ? "default" : "destructive"} 
                       className={tx.type === "INCOME" ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20" : "bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 border-rose-500/20"}
                >
                  {tx.type}
                </Badge>
              </TableCell>
              <TableCell className={`text-right font-bold ${tx.type === "INCOME" ? "text-emerald-500" : ""}`}>
                {tx.type === "INCOME" ? "+" : "-"} {formatCurrency(tx.amount)}
                </TableCell>
              
              {/* ROLE-BASED UI: Hide Delete button for Viewers */}
              {role === "ADMIN" && (
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}