import { useState } from "react";
import { Plus, Trash2, Shield, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "developer" | "finance";
  status: "active" | "inactive";
  joinedDate: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "john.doe@company.com",
      firstName: "John",
      lastName: "Doe",
      role: "admin",
      status: "active",
      joinedDate: "2024-01-15",
    },
    {
      id: "2",
      email: "jane.smith@company.com",
      firstName: "Jane",
      lastName: "Smith",
      role: "developer",
      status: "active",
      joinedDate: "2024-02-01",
    },
    {
      id: "3",
      email: "bob.finance@company.com",
      firstName: "Bob",
      lastName: "Finance",
      role: "finance",
      status: "active",
      joinedDate: "2024-01-20",
    },
  ]);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "developer" | "finance">("developer");

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const newUser: User = {
      id: String(users.length + 1),
      email: inviteEmail,
      firstName: inviteEmail.split(".")[0],
      lastName: inviteEmail.split(".")[1] || "User",
      role: inviteRole,
      status: "active",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setUsers((prev) => [newUser, ...prev]);
    setInviteEmail("");
    setInviteRole("developer");
    setShowInviteForm(false);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const roleColors: Record<string, string> = {
    admin: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    developer: "bg-blue-100 dark:bg-blue-900/30 text-muted-foreground dark:text-blue-400",
    finance: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage team members and their access levels
          </p>
        </div>
        <Button
          onClick={() => setShowInviteForm(!showInviteForm)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Invite New User</h3>
          <form onSubmit={handleInviteUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="user@company.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-white dark:bg-slate-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Role</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-white dark:bg-slate-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
                <option value="finance">Finance</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Send Invite
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowInviteForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white dark:bg-slate-900 border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-border">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Name</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Email</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Role</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Joined</th>
              <th className="text-right py-4 px-6 font-semibold text-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-muted-foreground">{user.email}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded text-xs font-medium ${roleColors[user.role]}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-muted-foreground">{user.joinedDate}</td>
                <td className="py-4 px-6 text-right">
                  {user.role !== "admin" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">Role Permissions</h4>
          <ul className="text-xs text-muted-foreground dark:text-blue-300 mt-2 space-y-1">
            <li><strong>Admin:</strong> Full access to all settings and configurations</li>
            <li><strong>Developer:</strong> Access to API credentials, webhooks, and integration</li>
            <li><strong>Finance:</strong> Access to transactions, reports, and reconciliation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
