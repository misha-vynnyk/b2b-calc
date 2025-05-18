import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ChartData {
  month: string;
  income: number;
}

interface IncomeChartProps {
  entries: {
    amount: number;
    date: string;
    source: string;
  }[];
  filterSource: string;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const IncomeChart: React.FC<IncomeChartProps> = ({
  entries,
  filterSource,
}) => {
  const monthlyIncome: Record<string, number> = {};

  entries.forEach(({ amount, date, source }) => {
    if (filterSource && filterSource !== source) return;

    const month = date.slice(5, 7);
    monthlyIncome[month] = (monthlyIncome[month] || 0) + amount;
  });

  const data: ChartData[] = monthNames.map((name, i) => {
    const m = (i + 1).toString().padStart(2, "0");
    return { month: name, income: monthlyIncome[m] || 0 };
  });

  return (
    <div style={{ width: "100%", height: 300, marginTop: "1.5rem" }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="month" stroke="#eee" tick={{ fontSize: 14 }} />
          <YAxis
            stroke="#eee"
            tickFormatter={(value) => `${value} zł`}
            tick={{ fontSize: 14 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#222",
              borderRadius: 8,
              border: "none",
            }}
            itemStyle={{ color: "#4e91fc", fontWeight: "bold" }}
            formatter={(value: number) => `${value.toFixed(2)} zł`}
          />
          <Bar dataKey="income" fill="#4e91fc" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
