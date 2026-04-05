"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { formatCurrency } from "@/utils/currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { motion, Variants } from "framer-motion";

const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };

export function SummaryCards() {
  const { summary, isLoading } = useTransactions();

  if (isLoading) return <div className="grid gap-4 md:grid-cols-3">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-36 w-full rounded-xl" />)}</div>;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-3 items-stretch">
      
      <motion.div variants={item} className="h-full">
        <Card className="h-full flex flex-col justify-between bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border-indigo-500/20 shadow-sm transition-all hover:shadow-indigo-500/10 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{formatCurrency(summary.balance)}</div>
            <p className="text-sm text-muted-foreground mt-1">Overall 30-day cashflow</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="h-full">
        <Card className="h-full flex flex-col justify-between bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20 shadow-sm transition-all hover:shadow-emerald-500/10 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpRight className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-emerald-500">{formatCurrency(summary.income)}</div>
            <p className="text-sm text-muted-foreground mt-1">All revenue streams</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="h-full">
        <Card className="h-full flex flex-col justify-between bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent border-rose-500/20 shadow-sm transition-all hover:shadow-rose-500/10 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownRight className="h-5 w-5 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-rose-500">{formatCurrency(summary.expense)}</div>
            <p className="text-sm text-muted-foreground mt-1">All expense categories</p>
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  );
}