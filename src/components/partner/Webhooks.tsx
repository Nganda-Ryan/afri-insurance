import { useState } from "react";
import { Plus, Trash2, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: "active" | "inactive";
  lastTriggered: string;
  deliveryRate: string;
}

interface WebhookLog {
  id: string;
  event: string;
  status: "delivered" | "failed";
  timestamp: string;
  statusCode: number;
}

export function Webhooks() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: "1",
      url: "https://api.example.com/webhooks/payments",
      events: ["payment.succeeded", "payment.failed", "refund.succeeded"],
      status: "active",
      lastTriggered: "2 minutes ago",
      deliveryRate: "99.8%",
    },
    {
      id: "2",
      url: "https://api.example.com/webhooks/settlements",
      events: ["settlement.completed"],
      status: "active",
      lastTriggered: "1 hour ago",
      deliveryRate: "100%",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedWebhook, setSelectedWebhook] = useState<string | null>(null);

  const allEvents = [
    "payment.succeeded",
    "payment.failed",
    "refund.succeeded",
    "refund.failed",
    "settlement.completed",
    "settlement.failed",
  ];

  const webHookLogs: WebhookLog[] = [
    {
      id: "LOG001",
      event: "payment.succeeded",
      status: "delivered",
      timestamp: "2024-03-15 14:35",
      statusCode: 200,
    },
    {
      id: "LOG002",
      event: "payment.failed",
      status: "delivered",
      timestamp: "2024-03-15 13:20",
      statusCode: 200,
    },
    {
      id: "LOG003",
      event: "settlement.completed",
      status: "failed",
      timestamp: "2024-03-15 12:00",
      statusCode: 500,
    },
  ];

  const handleAddWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebhookUrl || selectedEvents.length === 0) return;

    const newWebhook: Webhook = {
      id: String(webhooks.length + 1),
      url: newWebhookUrl,
      events: selectedEvents,
      status: "active",
      lastTriggered: "Just now",
      deliveryRate: "100%",
    };

    setWebhooks((prev) => [newWebhook, ...prev]);
    setNewWebhookUrl("");
    setSelectedEvents([]);
    setShowAddForm(false);
  };

  const toggleEvent = (event: string) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  const deleteWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((webhook) => webhook.id !== id));
    if (selectedWebhook === id) setSelectedWebhook(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Webhooks</h1>
          <p className="text-muted-foreground mt-2">Manage webhook subscriptions and monitor delivery</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Webhook
        </Button>
      </div>

      {/* Add Webhook Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Add New Webhook</h3>
          <form onSubmit={handleAddWebhook} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value={newWebhookUrl}
                onChange={(e) => setNewWebhookUrl(e.target.value)}
                placeholder="https://api.example.com/webhooks"
                className="w-full px-4 py-2 rounded-lg border border-border bg-white dark:bg-slate-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Subscribe to Events
              </label>
              <div className="grid grid-cols-2 gap-3">
                {allEvents.map((event) => (
                  <label key={event} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event)}
                      onChange={() => toggleEvent(event)}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">{event}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Create Webhook
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Webhooks List */}
      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div
            key={webhook.id}
            className="bg-white dark:bg-slate-900 border border-border rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-mono text-sm text-foreground break-all">{webhook.url}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      webhook.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {webhook.status.charAt(0).toUpperCase() + webhook.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Last triggered: {webhook.lastTriggered} • Delivery rate: {webhook.deliveryRate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSelectedWebhook(selectedWebhook === webhook.id ? null : webhook.id)
                  }
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteWebhook(webhook.id)}
                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {webhook.events.map((event) => (
                <span
                  key={event}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-muted-foreground dark:text-blue-400 rounded text-xs font-medium"
                >
                  {event}
                </span>
              ))}
            </div>

            {/* Webhook Logs for Selected Webhook */}
            {selectedWebhook === webhook.id && (
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground mb-4">Recent Deliveries</h4>
                <div className="space-y-2">
                  {webHookLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded text-sm"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {log.status === "delivered" ? (
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{log.event}</p>
                          <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            log.status === "delivered"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {log.statusCode}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
