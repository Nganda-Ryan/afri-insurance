"use client";

interface WebsiteShellProps {
  children: React.ReactNode;
}

export function WebsiteShell({ children }: WebsiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7] pb-10">
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
