"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const PollForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const router = useRouter();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPoll = async () => {
    const validOptions = options.filter(opt => opt.trim() !== "");
    if (!question.trim() || validOptions.length < 2) {
      alert("Please enter a question and at least two valid options.");
      return;
    }

    await axios.post("/api/polls", { question, options: validOptions });
    router.push("/");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a Poll</h2>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((opt, idx) => (
        <input
          key={idx}
          type="text"
          className="border p-2 w-full mb-2"
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(idx, e.target.value)}
        />
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={addOption}>
        + Add Option
      </button>
      <button className="bg-green-500 text-white px-4 py-2" onClick={createPoll}>
        Create Poll
      </button>
    </div>
  );
};

export default PollForm;
