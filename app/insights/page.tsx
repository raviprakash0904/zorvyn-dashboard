import { InsightsEngine } from "@/features/insights/InsightsEngine";

export default function InsightsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Smart Insights</h2>
        <p className="text-muted-foreground">
          AI-driven analysis of your spending habits and financial health.
        </p>
      </div>
      
      <InsightsEngine />
    </div>
  );
}