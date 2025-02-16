import { connectToDatabase } from "@/lib/mongodb";
import Poll from "@/models/Poll";
import { NextResponse } from "next/server";

// 🟢 Get Poll by ID (GET)
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const poll = await Poll.findById(params.id);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }
    return NextResponse.json(poll, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 🟢 Vote on a Poll (PATCH)
export async function PATCH(req, { params }) {
  try {
    const { optionIndex } = await req.json();
    await connectToDatabase();

    const poll = await Poll.findById(params.id);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    // Increment the vote count for the selected option
    if (poll.options[optionIndex]) {
      poll.options[optionIndex].votes += 1;
      await poll.save();
    } else {
      return NextResponse.json({ error: "Invalid option" }, { status: 400 });
    }

    return NextResponse.json(poll, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}
