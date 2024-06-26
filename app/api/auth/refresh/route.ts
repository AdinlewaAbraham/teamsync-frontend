import getTokenExpiration from "@/utilis/getTokenExpiration";
import axios from "axios";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { baseURL } from "@/constants/api";

export async function POST(req: NextRequest) {
  try {
    const url = baseURL + "/auth/refresh/";
    const { data, status } = await axios.post(url, await req.json());

    console.log(data, status);

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
