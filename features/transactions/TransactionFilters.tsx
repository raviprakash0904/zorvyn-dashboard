"use client";

import { useStore } from "@/store/useStore";
import { useTransactions } from "@/hooks/useTransactions";
import { exportToCSV } from "@/utils/exportCsv";
import { AddTransactionModal } from "./AddTransactionModal";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import { toast } from "sonner";

export function TransactionFilters() {
  const { searchTerm, setSearchTerm, typeFilter, setTypeFilter, role } = useStore();
  const { data: transactions } = useTransactions();

  const handleExport = () => {
    if (!transactions || transactions.length === 0) {
      toast.error("No data to export");
      return;
    }
    exportToCSV(transactions, "zorvyn_finance_report.csv");
    toast.success("Report downloaded successfully");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
      {/* Left side: Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search descriptions or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={(val: any) => setTypeFilter(val)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Transactions</SelectItem>
            <SelectItem value="INCOME">Income Only</SelectItem>
            <SelectItem value="EXPENSE">Expenses Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
        
        {/* ROLE-BASED UI: Only Admins can add transactions */}
        {role === "ADMIN" && <AddTransactionModal />}
      </div>
    </div>
  );
}