import { NextResponse } from "next/server";
import ConnectDB from "../../db/db";
import User from '../../model/model'

export async function POST(req) {
try {

  await ConnectDB()

  const body = await req.json();
  
  const {Uname} = body

  const response = await User.findOne({Uname})

  return NextResponse.json(
    {data:response},
    {status:200}
  )
  
} catch (error) {
  return NextResponse.json(
    {msg:"Internal server Error"},
    {status:500}
  )
}
  
}