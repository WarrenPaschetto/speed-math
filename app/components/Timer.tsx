"use client"

import React from "react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <div className="text-2xl font-bold text-red-500 mb-4">
      Time Left: {timeLeft}s
    </div>
  );
};

export default Timer;
