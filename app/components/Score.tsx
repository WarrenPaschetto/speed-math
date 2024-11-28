"use client"

import React from "react";

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="text-2xl font-bold text-green-500 mb-4">
      Score: {score}
    </div>
  );
};

export default Score;
