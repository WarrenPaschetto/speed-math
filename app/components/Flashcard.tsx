"use client"

import React from "react";

interface FlashcardProps {
  problem: { num1: number; num2: number; operator: string } | null;
}

const Flashcard: React.FC<FlashcardProps> = ({ problem }) => {
  if (!problem) return null;

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md mb-4">
      <p className="text-2xl font-semibold">{`${problem.num1} ${problem.operator} ${problem.num2}`}</p>
    </div>
  );
};

export default Flashcard;
