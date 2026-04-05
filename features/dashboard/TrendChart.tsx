"use client";

import { useTransactions } from "@/hooks/useTransactions";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import * as echarts from "echarts"; // <-- Import ECharts

export function TrendChart() {
  const { data: transactions, isLoading } = useTransactions();
  const { resolvedTheme } = useTheme();

  const chartOptions = useMemo(() => {
    if (!transactions) return {};

    const dateMap = new Map<string, { income: number; expense: number }>();
    const sortedTx = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    sortedTx.forEach((tx) => {
      const dateLabel = new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (!dateMap.has(dateLabel)) dateMap.set(dateLabel, { income: 0, expense: 0 });
      if (tx.type === "INCOME") dateMap.get(dateLabel)!.income += tx.amount;
      else dateMap.get(dateLabel)!.expense += tx.amount;
    });

    const dates = Array.from(dateMap.keys());
    const incomes = Array.from(dateMap.values()).map(d => d.income);
    const expenses = Array.from(dateMap.values()).map(d => d.expense);

    return {
      backgroundColor: "transparent",
      tooltip: { trigger: "axis", backgroundColor: resolvedTheme === "dark" ? "#18181b" : "#ffffff", borderColor: resolvedTheme === "dark" ? "#27272a" : "#e4e4e7" },
      legend: { data: ["Income", "Expense"], textStyle: { color: resolvedTheme === "dark" ? "#a1a1aa" : "#3f3f46" } },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: { 
        type: "category", boundaryGap: false, data: dates,
        axisLabel: { color: resolvedTheme === "dark" ? "#a1a1aa" : "#3f3f46" },
        axisLine: { lineStyle: { color: resolvedTheme === "dark" ? "#27272a" : "#e4e4e7" } }
      },
      yAxis: { 
        type: "value",
        splitLine: { lineStyle: { color: resolvedTheme === "dark" ? "#27272a" : "#e4e4e7", type: "dashed" } },
        axisLabel: { color: resolvedTheme === "dark" ? "#a1a1aa" : "#3f3f46" }
      },
      series: [
        {
          name: "Income", type: "line", smooth: true, symbol: "none",
          lineStyle: { width: 3, shadowColor: 'rgba(16, 185, 129, 0.5)', shadowBlur: 10 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(16, 185, 129, 0.4)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.0)' }
            ])
          },
          itemStyle: { color: "#10b981" },
          data: incomes,
        },
        {
          name: "Expense", type: "line", smooth: true, symbol: "none",
          lineStyle: { width: 3, shadowColor: 'rgba(244, 63, 94, 0.5)', shadowBlur: 10 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(244, 63, 94, 0.4)' },
              { offset: 1, color: 'rgba(244, 63, 94, 0.0)' }
            ])
          },
          itemStyle: { color: "#f43f5e" },
          data: expenses,
        },
      ],
    };
  }, [transactions, resolvedTheme]);

  if (isLoading) return <Skeleton className="h-[400px] w-full rounded-xl" />;

  return (
    <Card className="col-span-4 shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle>Cashflow Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ReactECharts option={chartOptions} style={{ height: "100%", minHeight: "350px", width: "100%" }} />
      </CardContent>
    </Card>
  );
}