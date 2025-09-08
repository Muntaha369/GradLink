import { NextResponse } from "next/server";
import ConnectDB from "../../db/db";
import User from "../../model/model";

export async function POST(req) {
  try {
    // Await the database connection
    await ConnectDB();

    const body = await req.json();
    const { name, email, pass } = body;

    // Await the user creation promise
    const NewUser = await User.create({ name, email, pass });

    return NextResponse.json({
      msg: "User created successfully",
      user: NewUser,
    }, { status: 201 });

  } catch (error) {
    // Log the error for debugging
    console.error("API Error:", error);

    // Return a proper error response
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
