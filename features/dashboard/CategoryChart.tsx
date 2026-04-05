"use client";

import { useTransactions } from "@/hooks/useTransactions";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import * as echarts from "echarts";

export function CategoryChart() {
  const { data: transactions, isLoading } = useTransactions();
  const { resolvedTheme } = useTheme();

  const chartOptions = useMemo(() => {
    if (!transactions) return {};

    const expenses = transactions.filter((t) => t.type === "EXPENSE");
    const categoryMap = new Map<string, number>();

    expenses.forEach((tx) => {
      categoryMap.set(tx.category, (categoryMap.get(tx.category) || 0) + tx.amount);
    });

    // Premium Color Palette with Linear Gradients
    const premiumColors = [
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#8b5cf6' }, { offset: 1, color: '#4f46e5' }]), // Purple-Indigo
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#10b981' }, { offset: 1, color: '#059669' }]), // Emerald
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#f43f5e' }, { offset: 1, color: '#e11d48' }]), // Rose
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#f59e0b' }, { offset: 1, color: '#d97706' }]), // Amber
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#0ea5e9' }, { offset: 1, color: '#0284c7' }]), // Sky Blue
    ];

    const pieData = Array.from(categoryMap.entries())
      .map(([name, value], index) => ({
        name,
        value,
        itemStyle: { color: premiumColors[index % premiumColors.length] }
      }))
      .sort((a, b) => b.value - a.value);

    return {
      backgroundColor: "transparent",
      tooltip: { 
        trigger: "item", 
        formatter: "{b}: ₹{c} ({d}%)",
        backgroundColor: resolvedTheme === "dark" ? "#18181b" : "#ffffff",
        borderColor: resolvedTheme === "dark" ? "#27272a" : "#e4e4e7",
        textStyle: { color: resolvedTheme === "dark" ? "#ffffff" : "#000000" }
      },
      legend: { 
        orient: "vertical", left: "left", top: "center",
        textStyle: { color: resolvedTheme === "dark" ? "#a1a1aa" : "#3f3f46", fontSize: 12 }
      },
      series: [
        {
          name: "Expenses",
          type: "pie",
          radius: ["55%", "80%"], // Sleeker ring
          center: ["65%", "50%"], // Shift right to make room for legend
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 12,
            borderColor: resolvedTheme === "dark" ? "#09090b" : "#ffffff", // Matches card background perfectly
            borderWidth: 4,
            shadowBlur: 15, // Adds a glowing drop shadow
            shadowColor: resolvedTheme === "dark" ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.1)',
            shadowOffsetY: 5
          },
          label: { show: false, position: "center" },
          emphasis: {
            label: { show: true, fontSize: 18, fontWeight: "bold", color: resolvedTheme === "dark" ? "#ffffff" : "#000000" },
            itemStyle: { shadowBlur: 20, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
          },
          labelLine: { show: false },
          data: pieData,
        },
      ],
    };
  }, [transactions, resolvedTheme]);

  if (isLoading) return <Skeleton className="h-[400px] w-full rounded-xl" />;

  return (
    <Card className="col-span-3 shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <ReactECharts option={chartOptions} style={{ height: "100%", minHeight: "350px", width: "100%" }} />
      </CardContent>
    </Card>
  );
}