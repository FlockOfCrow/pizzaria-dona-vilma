"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const getStatus = () => {
  const timeZone = "America/Sao_Paulo";
  const now = new Date();
  const localTime = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = parseInt(localTime.find((p) => p.type === "hour")?.value || "0");
  const minute = parseInt(
    localTime.find((p) => p.type === "minute")?.value || "0"
  );
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  })
    .format(now)
    .toLowerCase();
  if (dayOfWeek === "mon") {
    return false;
  }
  if (hour > 18 || (hour === 18 && minute >= 30) || (hour >= 0 && hour < 6)) {
    return true;
  }
  return false;
};

export default function HomeLocation() {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(getStatus());
    const interval = setInterval(() => {
      setStatus(getStatus());
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
