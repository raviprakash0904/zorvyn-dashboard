import { SummaryCards } from "@/features/dashboard/SummaryCards";
import { TrendChart } from "@/features/dashboard/TrendChart";
import { CategoryChart } from "@/features/dashboard/CategoryChart";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Your financial overview and recent insights.
        </p>
      </div>
      
      <SummaryCards />
      
      {/* Dynamic ECharts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <TrendChart />
        <CategoryChart />
      </div>
    </div>
  );
}