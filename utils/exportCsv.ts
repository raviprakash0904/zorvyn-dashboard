import { Transaction } from "@/types";

export function exportToCSV(data: Transaction[], filename = "transactions.csv") {
  // 1. Define headers
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  
  // 2. Map data to rows
  const rows = data.map(tx => [
    new Date(tx.date).toLocaleDateString("en-US"),
    `"${tx.description}"`, // Wrap in quotes to prevent issues with commas in descriptions
    tx.category,
    tx.type,
    tx.amount.toString()
  ]);

  // 3. Combine into CSV string
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  // 4. Create Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}