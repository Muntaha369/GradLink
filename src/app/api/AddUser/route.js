import { NextResponse } from "next/server";
import ConnectDB from "../../db/db";
import User from "../../model/model";
import Admin from "../../model/adminModel";

export async function POST(req) {
  try {
    await ConnectDB();

    const body = await req.json();
    const { name, email, pass, phone, GY, Uname, JobDesc } = body;

    
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
      
      const findUser = await User.findOne({ email });

      if (findUser) {
        return NextResponse.json({
          msg: "User with this email already exists"
        }, { status: 409 });
      }

      const NewUser = await User.create({ name, email, pass, phone, GY, Uname, JobDesc });

      return NextResponse.json({
        msg: "User created successfully",
        user: NewUser,
      }, { status: 201 });
    }

    catch (error) {
    
    console.error("API Error:", error);

    
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}