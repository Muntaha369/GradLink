import { NextResponse } from "next/server";
import ConnectDB from "../../db/db";
import User from "../../model/model";

export async function POST(req) {
  try {

    await ConnectDB();

    const body = await req.json();
    const {email, pass} = body;

    const findUser = await User.findOne({email, pass})

    if(!findUser){
      return NextResponse.json({
        msg:"Not valid email or password"
      })
    }

    return NextResponse.json({
      msg: "Logged in successfully",
    }, { status: 200 });

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
