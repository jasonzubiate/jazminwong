"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  const hours12 = hours % 12 || 12;
  const amPm = hours >= 12 ? "PM" : "AM";

  return (
    <p className="font-semibold text-xl">
      <span>{hours12.toString().padStart(2, "0")}</span>
      <span className="blink-animation">:</span>
      <span>{minutes.toString().padStart(2, "0")}</span>
      {" "}
      <span>{amPm}</span>
    </p>
  );
}
