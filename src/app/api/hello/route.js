import { NextResponse } from "next/server";

import ConnectDB from "../../db/db";

export async function GET(req) {

  await ConnectDB()

  return NextResponse.json({
    msg:"Hello from docker"
  })
}