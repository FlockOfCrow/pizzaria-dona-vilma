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
import { useEffect, useState } from "react";

const chartConfig = {
  users: {
    label: "Usuários",
    color: "#cfbb90",
  },
} satisfies ChartConfig;

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ChartUser() {
  const [chartData, setChartData] = useState<
    { month: string; users: number }[]
  >([
    { month: "Janeiro", users: 0 },
    { month: "Fevereiro", users: 0 },
    { month: "Março", users: 0 },
    { month: "Abril", users: 0 },
    { month: "Maio", users: 0 },
    { month: "Junho", users: 0 },
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
            `/api/users?month=${monthNumber}&year=${year}`
          );
          if (!res.ok) {
            throw new Error("Falha ao buscar os dados do mês " + monthNumber);
          }
          const usersCount = await res.json();

          newChartData.push({
            month: monthName,
            users: usersCount,
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
    <Card className="flex flex-col shadow-lg border-border-pizza">
      <CardHeader className="text-center">
        <CardTitle>Usuários Cadastrados</CardTitle>
        <CardDescription>
          Mostra o total de usuários cadastrados nos últimos 6 meses
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
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="users"
              type="natural"
              fill="#cfbb90"
              fillOpacity={0.4}
              stroke="#cfbb90"
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
