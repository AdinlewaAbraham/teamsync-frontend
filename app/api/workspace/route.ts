import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchWithAuth } from "../fetchWithAuth";
import { baseURL } from "@/constants/api";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const url = baseURL + "/workspace/";
    const postBody = await req.json();
    const { data, status } = await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify(postBody),
    });
    return NextResponse.json(data, { status });
  } catch (err) {
    console.error(err);
  }
}
export async function PUT(req: NextRequest, res: NextResponse) {}
