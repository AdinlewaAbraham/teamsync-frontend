import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuth } from "../fetchWithAuth";
import { baseURL } from "@/constants/api";

export async function POST(req: NextRequest) {
  const postBody = await req.json();
  const url = baseURL + "/section/";
  const { data, status } = await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(postBody),
  });

  return NextResponse.json(data, { status: status });
}
