export interface QuoteAmountBreakdownRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface QuoteAmountBreakdownTableProps {
  rows: QuoteAmountBreakdownRow[];
}

export function QuoteAmountBreakdownTable({ rows }: QuoteAmountBreakdownTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed text-sm">
        <colgroup>
          <col className="w-[55%]" />
          <col className="w-[45%]" />
        </colgroup>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-gray-100 last:border-0"
            >
              <td className="py-2.5 pr-3 align-top font-medium text-gray-700">
                {row.label}
              </td>
              <td
                className={`py-2.5 text-right align-top whitespace-nowrap ${
                  row.highlight ? "font-bold text-brand-primary" : "text-text-main"
                }`}
              >
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
