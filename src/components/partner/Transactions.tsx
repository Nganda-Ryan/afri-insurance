import { useState } from "react";
import { Download, Search } from "lucide-react";
import { Button } from "../ui/button";

interface Transaction {
  id: string;
  amount: string;
  currency: string;
  status: "completed" | "pending" | "failed";
  method: string;
  source: string;
  destination: string;
  date: string;
  reference: string;
}

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending" | "failed">(
    "all"
  );

  const [transactions] = useState<Transaction[]>([
    {
      id: "TXN0001",
      amount: "1,250.00",
      currency: "USD",
      status: "completed",
      method: "Credit Card",
      source: "CUST_001",
      destination: "MERCH_001",
      date: "2024-03-15 14:30",
      reference: "REF_20240315_001",
    },
    {
      id: "TXN0002",
      amount: "2,840.50",
      currency: "USD",
      status: "completed",
      method: "Bank Transfer",
      source: "CUST_002",
      destination: "MERCH_001",
      date: "2024-03-15 12:15",
      reference: "REF_20240315_002",
    },
    {
      id: "TXN0003",
      amount: "456.75",
      currency: "USD",
      status: "pending",
      method: "Mobile Money",
      source: "CUST_003",
      destination: "MERCH_001",
      date: "2024-03-14 09:45",
      reference: "REF_20240314_001",
    },
    {
      id: "TXN0004",
      amount: "3,120.00",
      currency: "USD",
      status: "completed",
      method: "Credit Card",
      source: "CUST_004",
      destination: "MERCH_001",
      date: "2024-03-13 16:20",
      reference: "REF_20240313_001",
    },
    {
      id: "TXN0005",
      amount: "789.25",
      currency: "USD",
      status: "failed",
      method: "Debit Card",
      source: "CUST_005",
      destination: "MERCH_001",
      date: "2024-03-13 11:00",
      reference: "REF_20240313_002",
    },
    {
      id: "TXN0006",
      amount: "5,500.00",
      currency: "USD",
      status: "completed",
      method: "Bank Transfer",
      source: "CUST_006",
      destination: "MERCH_001",
      date: "2024-03-12 13:45",
      reference: "REF_20240312_001",
    },
  ]);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const csv = [
      ["Transaction ID", "Amount", "Currency", "Status", "Method", "Date", "Reference"],
      ...filteredTransactions.map((txn) => [
        txn.id,
        txn.amount,
        txn.currency,
        txn.status,
        txn.method,
        txn.date,
        txn.reference,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-2">View and manage all payment transactions</p>
        </div>
        <Button onClick={handleExport} className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Transaction ID or Reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-white dark:bg-slate-800 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white dark:bg-slate-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Date Range (placeholder) */}
          <div>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-lg border border-border bg-white dark:bg-slate-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue="2024-03-15"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-slate-900 border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-border">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">ID</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Amount</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Method</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Date</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Reference</th>
              <th className="text-right py-4 px-6 font-semibold text-foreground text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-4 px-6">
                  <span className="font-mono text-sm font-semibold text-primary">{txn.id}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-semibold text-foreground text-sm">
                    {txn.currency} {txn.amount}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-muted-foreground">{txn.method}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      txn.status === "completed"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : txn.status === "pending"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-muted-foreground">{txn.date}</td>
                <td className="py-4 px-6 text-sm text-muted-foreground font-mono">{txn.reference}</td>
                <td className="py-4 px-6 text-right">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
