import { connectDB } from "@/utils/mongoose";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    connectDB();
    const userFound = await User.findById(params.id);

    if (!userFound)
      return NextResponse.json(
        {
          message: "user no found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(userFound);
  } catch (error) {
    return NextResponse.json(error.message, {
        status: 400
    })
  }
}

export async function PUT(request, {params}){
    const data = await request.json();
    const userUpdated = await User.findByIdAndUpdate(params.id, data, {
        new: true,
    });
    return NextResponse.json(userUpdated);
}
