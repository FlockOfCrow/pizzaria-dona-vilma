"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const getStatus = (
  startDay: number,
  endDay: number,
  openHour: number,
  closeHour: number
): boolean => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= startDay && day <= endDay) {
    if (hour >= openHour && hour < closeHour) {
      return true;
    }
  }
  return false;
};

export default function HomeLocation() {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(getStatus(2, 0, 18, 24));
    const interval = setInterval(() => {
      setStatus(getStatus(2, 0, 9, 22));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="justify-center items-center flex">
      <div className="shadow-xl bg-bg border-2 border-border-pizza rounded-lg px-5 py-5 space-y-2 lg:w-2/3 w-[80%]">
        <div className="flex flex-wrap items-center xl:justify-between xl:text-lg text-md justify-center">
          <div className="flex flex-row gap-x-0.5 items-center">
            <MapPin className="w-6 h-6 stroke-[1.5px]" />
            <div>Ipatinga - MG</div>
          </div>
          <div>*Mais informações</div>
        </div>
        <div className="space-x-1 text-center">
          <button
            className={`underline ${
              status ? "text-green-600" : "text-red-600"
            }`}
          >
            {status ? "Aberto" : "Fechado"}
          </button>
          <span>* Terça a domingo das 18:30 às 00:00</span>
        </div>
      </div>
    </div>
  );
}
