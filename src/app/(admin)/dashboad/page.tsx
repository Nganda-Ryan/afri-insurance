import { TrendingUp, Users, Zap, AlertCircle } from "lucide-react";

export default function Page() {
  const stats = [
    {
      label: "Total Transactions",
      value: "12,485",
      change: "+12.5%",
      icon: TrendingUp,
      color: "blue",
    },
    {
      label: "Success Rate",
      value: "98.7%",
      change: "+0.2%",
      icon: Zap,
      color: "green",
    },
    {
      label: "Active Users",
      value: "24",
      change: "+3",
      icon: Users,
      color: "purple",
    },
    {
      label: "Pending Settlements",
      value: "$145,230",
      change: "-5.3%",
      icon: AlertCircle,
      color: "orange",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN001",
      amount: "$1,250.00",
      status: "completed",
      method: "Credit Card",
      date: "2 hours ago",
    },
    {
      id: "TXN002",
      amount: "$2,840.50",
      status: "completed",
      method: "Bank Transfer",
      date: "4 hours ago",
    },
    {
      id: "TXN003",
      amount: "$456.75",
      status: "pending",
      method: "Mobile Money",
      date: "1 day ago",
    },
    {
      id: "TXN004",
      amount: "$3,120.00",
      status: "completed",
      method: "Credit Card",
      date: "2 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-blue-700 mt-2">Welcome back! Here&apos;s your performance overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses: Record<string, string> = {
            blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
            green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
            purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
            orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
          };

          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
              </div>
              <p className="text-blue-700 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Transactions</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                  Transaction ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4 text-sm font-mono text-primary">{txn.id}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-foreground">{txn.amount}</td>
                  <td className="py-3 px-4 text-sm text-blue-700">{txn.method}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        txn.status === "completed"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-blue-700">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
