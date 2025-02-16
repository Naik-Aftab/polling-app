"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const PollPage = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPoll = async () => {
        try {
          const response = await axios.get(`/api/polls/${id}`);
          setPoll(response.data);
        } catch (error) {
          console.error("Error fetching poll:", error);
        }
      };

      fetchPoll();
      const interval = setInterval(fetchPoll, 5000);
      return () => clearInterval(interval);
    }
  }, [id]);

  useEffect(() => {
    // Check if user has already voted
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || {};
    if (votedPolls[id]) {
      setHasVoted(true);
    }
  }, [id]);

  // ✅ Handle voting
  const handleVote = async (optionIndex) => {
    if (hasVoted || loading) return;
    setLoading(true);

    try {
      const response = await axios.patch(`/api/polls/${id}`, { optionIndex });
      setPoll(response.data);

      // Store vote in localStorage
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || {};
      votedPolls[id] = true;
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls));
      setHasVoted(true);
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to submit vote. Please try again.");
    }

    setLoading(false);
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{poll.question}</h2>

      {hasVoted ? (
        // ✅ Show Results after voting
        <div className="mt-4">
          {poll.options.map((opt, index) => (
            <div key={index} className="p-2 border mt-2 bg-gray-100 rounded">
              <span className="font-semibold">{opt.text}</span> - {opt.votes} votes
            </div>
          ))}
        </div>
      ) : (
        // ✅ Show voting buttons before voting
        <div>
          {poll.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleVote(index)}
              disabled={loading}
              className="block p-2 border mt-2 w-full bg-blue-500 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PollPage;
