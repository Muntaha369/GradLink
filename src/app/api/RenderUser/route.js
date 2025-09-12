import { NextResponse } from "next/server";
import ConnectDB from "@/app/db/db";
import User from "@/app/model/model";

export async function GET(req) {
  try {
    await ConnectDB()
    
    const Users = await User.find();

    return NextResponse.json(
      {data: Users},
      {status:200}
    )
    
  } catch (error) {
    return NextResponse.json(
      {msg:"Internal server error"},
      {status:500}
    )
  }
}