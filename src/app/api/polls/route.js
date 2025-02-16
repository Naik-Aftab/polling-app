import { connectToDatabase } from "@/lib/mongodb";
import Poll from "@/models/Poll";
import { NextResponse } from "next/server";

// 🟢 Create a new poll (POST)
export async function POST(req) {
  try {

    await connectToDatabase();

    const { question, options } = await req.json();
    console.log("📊 Poll Data Received:", { question, options });

    // Validate input
    if (!question || !options || options.length < 2) {
      console.error("❌ Invalid poll data received");
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Create new poll
    const newPoll = new Poll({
      question,
      options: options.map((text) => ({ text, votes: 0 })),
    });

    await newPoll.save();
    console.log("🚀 New Poll Created:", newPoll);

    return NextResponse.json({ message: "Poll created successfully", poll: newPoll }, { status: 201 });
  } catch (error) {
    console.error("❌ Server error in POST:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 🟢 Fetch all polls (GET)
export async function GET() {
  try {

    await connectToDatabase();

    const polls = await Poll.find();
    console.log("📊 Polls Retrieved:", polls);

    return NextResponse.json(polls, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to fetch polls:", error);
    return NextResponse.json({ error: "Failed to fetch polls" }, { status: 500 });
  }
}
