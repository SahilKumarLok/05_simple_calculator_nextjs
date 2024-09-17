"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, ChangeEvent, useEffect } from "react";

// Import custom UI components from the UI directory
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Default export of the CalculatorComponent function
export default function Calculator() {
  // State hooks for managing input numbers, the result, and previous result
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [previousResult, setPreviousResult] = useState<string>("");

  // Handler for updating num1 state on input change
  const handleNum1Change = (e: ChangeEvent<HTMLInputElement>): void => {
    setNum1(e.target.value);
  };

  // Handler for updating num2 state on input change
  const handleNum2Change = (e: ChangeEvent<HTMLInputElement>): void => {
    setNum2(e.target.value);
  };

  // Function to validate inputs (check if both inputs are valid numbers)
  const areInputsValid = (): boolean => {
    return !isNaN(parseFloat(num1)) && !isNaN(parseFloat(num2)) && num1 !== "" && num2 !== "";
  };

  // Function to perform an operation and set the result
  const calculate = (operation: string): void => {
    if (areInputsValid()) {
      setPreviousResult(result); // Save the current result as the previous one

      let calcResult: number;

      switch (operation) {
        case "add":
          calcResult = parseFloat(num1) + parseFloat(num2);
          break;
        case "subtract":
          calcResult = parseFloat(num1) - parseFloat(num2);
          break;
        case "multiply":
          calcResult = parseFloat(num1) * parseFloat(num2);
          break;
        case "divide":
          if (parseFloat(num2) === 0) {
            setResult("Error: Division by zero");
            return;
          } else {
            calcResult = parseFloat(num1) / parseFloat(num2);
          }
          break;
        default:
          return;
      }

      setResult(calcResult.toString());
    } else {
      setResult("Error: Invalid input");
    }
  };

  // Function to clear the inputs and result
  const clear = (): void => {
    setNum1("");
    setNum2("");
    setResult("");
    setPreviousResult("");
  };

  // Add keyboard support for Enter and Escape
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && areInputsValid()) {
        calculate("add");
      } else if (e.key === "Escape") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [num1, num2]);

  // JSX return statement rendering the calculator UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Center the calculator within the screen */}
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {/* Card header with title */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Simple Calculator
          </CardTitle>
        </CardHeader>
        {/* Card content including inputs, buttons, and result display */}
        <CardContent className="space-y-4">
          {/* Display the previous result */}
          {previousResult && (
            <div className="text-center text-gray-700 dark:text-gray-300">
              <p>Previous Result: {previousResult}</p>
            </div>
          )}
          
          {/* Input fields for numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="num1">Number 1</Label>
              <Input
                id="num1"
                type="text"
                value={num1}
                onChange={handleNum1Change}
                placeholder="Enter a number"
                maxLength={10} // Limit input length
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="num2">Number 2</Label>
              <Input
                id="num2"
                type="text"
                value={num2}
                onChange={handleNum2Change}
                placeholder="Enter a number"
                maxLength={10} // Limit input length
              />
            </div>
          </div>
          {/* Buttons for arithmetic operations */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
              onClick={() => calculate("add")}
              disabled={!areInputsValid()} // Disable if inputs are invalid
            >
              +
            </Button>
            <Button
              variant="outline"
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
              onClick={() => calculate("subtract")}
              disabled={!areInputsValid()} // Disable if inputs are invalid
            >
              -
            </Button>
            <Button
              variant="outline"
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
              onClick={() => calculate("multiply")}
              disabled={!areInputsValid()} // Disable if inputs are invalid
            >
              *
            </Button>
            <Button
              variant="outline"
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
              onClick={() => calculate("divide")}
              disabled={!areInputsValid()} // Disable if inputs are invalid
            >
              /
            </Button>
          </div>
          {/* Display the result */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="result">Result</Label>
            <Input
              id="result"
              type="text"
              value={result}
              className="font-bold text-xl text-center"
              placeholder="Result"
              readOnly
            />
          </div>
          {/* Clear button to reset inputs and result */}
          <Button variant="outline" className="w-full" onClick={clear}>
            Clear
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
