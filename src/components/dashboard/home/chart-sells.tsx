"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import formatNumber from "@/utils/format-number";
import { useEffect, useState } from "react";

const chartConfig = {
  sells: {
    label: "Vendas",
    color: "#18991a",
  },
} satisfies ChartConfig;

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ChartSells() {
  const [chartData, setChartData] = useState<
    { month: string; sells: number }[]
  >([
    { month: "Janeiro", sells: 0 },
    { month: "Fevereiro", sells: 0 },
    { month: "Março", sells: 0 },
    { month: "Abril", sells: 0 },
    { month: "Maio", sells: 0 },
    { month: "Junho", sells: 0 },
  ]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const currentDate = new Date();
        const newChartData = [];

        for (let i = 5; i >= 0; i--) {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1
          );
          const monthNumber = date.getMonth() + 1;
          const year = date.getFullYear();
          const monthName = capitalize(
            new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date)
          );

          const res = await fetch(
            `/api/pizza?month=${monthNumber}&year=${year}`,
            {
              next: {
                revalidate: 60,
              },
            }
          );
          if (!res.ok) {
            throw new Error("Falha ao buscar os dados do mês " + monthNumber);
          }
          const usersCount = await res.json();

          newChartData.push({
            month: monthName,
            sells: usersCount,
          });
        }
        setChartData(newChartData);
      } catch (error: any) {
        console.error("Erro ao buscar os dados do gráfico:", error.message);
      }
    };

    fetchChartData();
  }, []);

  return (
    <Card className="shadow-lg border-border-pizza">
      <CardHeader className="text-center">
        <CardTitle>Vendas</CardTitle>
        <CardDescription>
          Mostra o total de vendas realizadas nos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 3,
              bottom: 2,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                return (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    indicator="line"
                    formatter={(value) => (
                      <div className="flex gap-x-2">
                        <div className="h-full w-1 rounded-t-md rounded-b-md bg-[#18991a]"></div>
                        <div className="grid gap-1.5">
                          <div className="text-foreground font-semibold">
                            {label}
                          </div>
                          <div className="font-mono font-medium tabular-nums text-foreground">
                            {formatNumber(value as number)}
                          </div>
                        </div>
                      </div>
                    )}
                  />
                );
              }}
            />
            <Area
              dataKey="sells"
              type="natural"
              fill="#18991a"
              fillOpacity={0.4}
              stroke="#18991a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
