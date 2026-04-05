"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { formatCurrency } from "@/utils/currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, TrendingUp, Trophy } from "lucide-react";
import { motion, Variants } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import * as echarts from "echarts"; 

const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };

export function InsightsEngine() {
  const { data: transactions, isLoading } = useTransactions();
  const { resolvedTheme } = useTheme();

  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) return null;

    const expenses = transactions.filter(t => t.type === "EXPENSE");
    const totalIncome = transactions.filter(t => t.type === "INCOME").reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);
    
    const categoryTotals = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);
    
    const sortedCategories = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a).slice(0, 5);

    const topCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : "None";
    const topCategoryAmount = sortedCategories.length > 0 ? sortedCategories[0][1] : 0;
    const largestExpense = expenses.length > 0 ? expenses.reduce((prev, current) => (prev.amount > current.amount) ? prev : current) : null;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    const textColor = resolvedTheme === "dark" ? "#a1a1aa" : "#3f3f46";

    // Bar Chart
    const topCategoriesChart = {
      backgroundColor: "transparent",
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      grid: { left: "3%", right: "15%", bottom: "3%", containLabel: true },
      xAxis: { type: "value", show: false },
      yAxis: { 
        type: "category", 
        data: sortedCategories.map(c => c[0]).reverse(),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: textColor, fontWeight: "bold", margin: 15 }
      },
      series: [
        {
          name: "Amount",
          type: "bar",
          barWidth: '50%',
          data: sortedCategories.map(c => c[1]).reverse(),
          itemStyle: {
            // ECharts Linear Gradient (Right to Left)
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#8b5cf6' }, // Purple
              { offset: 1, color: '#3b82f6' }  // Blue
            ]),
            borderRadius: [0, 6, 6, 0],
            shadowColor: 'rgba(139, 92, 246, 0.3)',
            shadowBlur: 10,
          },
          label: {
            show: true,
            position: "right",
            formatter: (params: any) => formatCurrency(params.value),
            color: textColor,
            fontWeight: "bold"
          }
        }
      ]
    };


    // Pie Chart
   const ratioChart = {
    backgroundColor: "transparent",
    tooltip: { trigger: "item" },
    legend: { bottom: "0%", left: "center", textStyle: { color: textColor } },
    series: [
      {
        name: "Cashflow",
        type: "pie",
        radius: ["60%", "85%"], // Thinner, sleeker ring
        avoidLabelOverlap: false,
        itemStyle: { 
          borderRadius: 20, // Perfectly rounded caps
          borderColor: resolvedTheme === "dark" ? "#09090b" : "#ffffff", 
          borderWidth: 6, // Thick separation 
          shadowBlur: 20, // Heavy glow
          shadowOffsetY: 8,
          shadowColor: 'rgba(0, 0, 0, 0.4)'
        },
        label: { show: false, position: "center" },
        emphasis: { label: { show: true, fontSize: 22, fontWeight: "bold", color: resolvedTheme === "dark" ? "#ffffff" : "#000000" } },
        labelLine: { show: false },
        data: [
          { 
            value: totalIncome, 
            name: "Income", 
            itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#34d399' }, { offset: 1, color: '#059669' }]) } 
          },
          { 
            value: totalExpense, 
            name: "Expenses", 
            itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#fb7185' }, { offset: 1, color: '#e11d48' }]) } 
          }
        ]
      }
    ]
  };

    return { topCategory, topCategoryAmount, largestExpense, savingsRate, topCategoriesChart, ratioChart };
  }, [transactions, resolvedTheme]);

  if (isLoading) return <Skeleton className="h-[400px] w-full rounded-xl" />;
  if (!chartData) return <div className="text-center py-10 text-muted-foreground">No data available for insights.</div>;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Tailwind Gradient Backgrounds on Cards */}
        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border-indigo-500/20 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top Expense Category</CardTitle>
              <TrendingUp className="h-5 w-5 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{chartData.topCategory}</div>
              <p className="text-sm text-muted-foreground mt-1">Costing you <span className="font-semibold text-foreground">{formatCurrency(chartData.topCategoryAmount)}</span></p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent border-rose-500/20 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Largest Single Expense</CardTitle>
              <AlertCircle className="h-5 w-5 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{chartData.largestExpense ? formatCurrency(chartData.largestExpense.amount) : "N/A"}</div>
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {chartData.largestExpense ? chartData.largestExpense.description : "No expenses recorded."}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
              <Trophy className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{chartData.savingsRate.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground mt-1">
                {chartData.savingsRate > 20 ? "Great job saving!" : "Try to reduce unnecessary expenses."}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div variants={item} className="h-full">
          <Card className="shadow-sm h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Top 5 Spending Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center">
              <ReactECharts option={chartData.topCategoriesChart} style={{ height: "350px", width: "100%" }} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="h-full">
          <Card className="shadow-sm h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Income vs. Expense Ratio</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <ReactECharts option={chartData.ratioChart} style={{ height: "350px", width: "100%" }} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}