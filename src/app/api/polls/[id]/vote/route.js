import { connectToDatabase } from "@/lib/mongodb";
import Poll from "@/models/Poll";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const { optionIndex } = await req.json();

    const poll = await Poll.findById(id);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return NextResponse.json({ error: "Invalid option" }, { status: 400 });
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    return NextResponse.json({ message: "Vote recorded", poll }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
