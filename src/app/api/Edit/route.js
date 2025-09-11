import { NextResponse } from "next/server";
import ConnectDB from "../../db/db";
import User from "../../model/model";  

export async function POST(req) {
    try {

        await ConnectDB();


        const body = await req.json();
        const { email, phone, JobDesc } = body;


        if (!email) {
            return NextResponse.json(
                { message: "Email is required." },
                { status: 400 }
            );
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: email }, 
            { $set: { phone: phone, JobDesc: JobDesc } },
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return NextResponse.json(
                { message: "User not found with that email." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User profile updated successfully.", user: updatedUser },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating user:", error); 
        return NextResponse.json(
            { message: "An internal server error occurred." },
            { status: 500 }
        );
    }
}