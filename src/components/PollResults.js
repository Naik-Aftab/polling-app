"use client"; // This is a client-side component

import { useEffect, useState } from "react";

export default function PollResults({ pollId }) {
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch poll results
  const fetchPollResults = async () => {
    try {
      const res = await fetch(`/api/polls/${pollId}`);
      if (!res.ok) throw new Error("Failed to fetch poll results");
      const data = await res.json();
      setPoll(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching poll results:", error);
    }
  };

  // Fetch results every 5 seconds
  useEffect(() => {
    fetchPollResults(); // Initial fetch
    const interval = setInterval(fetchPollResults, 5000);
    return () => clearInterval(interval); // Cleanup interval
  }, [pollId]);

  if (loading) return <p>Loading poll results...</p>;
  if (!poll) return <p>Poll not found.</p>;

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-xl font-semibold">{poll.question}</h2>
      <ul className="mt-3">
        {poll.options.map((option, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <span>{option.text}</span>
            <span className="font-bold">{option.votes} votes</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
