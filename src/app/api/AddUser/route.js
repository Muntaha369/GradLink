import { NextResponse } from "next/server";
import ConnectDB from "../../db/db";
import User from "../../model/model";

export async function POST(req) {
  try {

    await ConnectDB();

    const body = await req.json();
    const { name, email, pass, phone, GY, Uname, JobDesc } = body;

    const findUser = await User.findOne({email})

    if(findUser){
      return NextResponse.json({
        msg:"User already exist"
      })
    }
    
    const NewUser = await User.create({ name, email, pass, phone, GY, Uname, JobDesc });

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
