"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const response = await axios.get("/api/polls");
      setPolls(response.data);
    };
    fetchPolls();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Polls</h2>
      {polls.map((poll) => (
        <Link key={poll._id} href={`/poll/${poll._id}`} className="block p-4 border mb-2 hover:bg-gray-100">
          {poll.question}
        </Link>
      ))}
    </div>
  );
};

export default PollList;
