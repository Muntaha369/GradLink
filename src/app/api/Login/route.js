import { NextResponse } from "next/server";
import ConnectDB from "../../db/db";
import User from "../../model/model";
import Admin from "../../model/model"

export async function POST(req) {
  try {

    await ConnectDB();

    const body = await req.json();
    const {email, pass} = body;

    const findUser = await User.findOne({email, pass})
    const findAdmin = await Admin.findOne({email,pass})

    if(findAdmin){
      return NextResponse.json({
        name:findAdmin.name
      })
    }

    if(!findUser){
      return NextResponse.json({
        msg:"Not valid email or password"
      })
    }

    return NextResponse.json({
      name: findUser.name,
      phone: findUser.phone,
      JobDesc:findUser.JobDesc,
      Uname:findUser.Uname
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
