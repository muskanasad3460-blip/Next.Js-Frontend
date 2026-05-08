"use client";

import { time } from "console";
import { useEffect, useState } from "react";
export default function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();

    targetDate.setDate(targetDate.getDate() + 4);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) return;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units: (keyof typeof timeLeft)[] = [
    "days",
    "hours",
    "minutes",
    "seconds",
  ];
  return (
    <div className="flex items-center gap-4">
      {units.map((unit, index) => (
        <div key={unit} className="flex items-center gap-2">
          <div className="text-center">
            <p className="text-[10px] text-gray-500 uppercase">{unit}</p>
            <p className="text-3xl font-bold">
              {String(timeLeft[unit]).padStart(2, "0")}
            </p>
          </div>
          {index !== units.length - 1 && (
            <span className="text-2xl font-bold text-[#DB4444]  mt-5">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
