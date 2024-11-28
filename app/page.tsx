"use client"

import React, { useState, useEffect } from "react";
import Flashcard from "./components/Flashcard";
import Timer from "./components/Timer";
import StartButton from "./components/StartButton";
import Score from "./components/Score";


const GamePage: React.FC = () => {
  const [problem, setProblem] = useState<{ num1: number; num2: number; operator: string } | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    if (isGameRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameRunning(false);
    }
  }, [timeLeft, isGameRunning]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsGameRunning(true);
    generateProblem();
  };

  const generateProblem = () => {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let temp = 0;
    if (num2 > num1){
      temp = num1;
      num1 = num2;
      num2 = temp;

    }
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    setProblem({ num1, num2, operator });
  };

  const checkAnswer = (userAnswer: string) => {
    if (!problem) return;
    const { num1, num2, operator } = problem;
    const correctAnswer = eval(`${num1} ${operator} ${num2}`);
    if (parseInt(userAnswer, 10) === correctAnswer) {
      setScore((prev) => prev + 1);
      generateProblem();
    }
  };

  useEffect(() => {
    if (isGameRunning) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Speech recognition is not supported in your browser.");
        setIsGameRunning(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      //recognition.interimResults = true; // Enables real-time transcription
      recognition.maxAlternatives = 1; // Limits the number of alternatives for faster response

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const userAnswer = event.results[0][0].transcript.trim();
        checkAnswer(userAnswer);
        //recognition.abort(); // Stop recognition after each result
      };

      recognition.start();

      return () => recognition.stop();
    }
  }, [isGameRunning, problem]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Speed Math</h1>
      {!isGameRunning && <StartButton onClick={startGame} />}
      {isGameRunning && (
        <>
          <Timer timeLeft={timeLeft} />
          <Flashcard problem={problem} />
          <Score score={score} />
        </>
      )}
    </div>
  );
};

export default GamePage;
