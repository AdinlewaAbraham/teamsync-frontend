import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchWithAuth } from "../../fetchWithAuth";
import { baseURL } from "@/constants/api";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const url = baseURL + "/workspace/" + params.id;
    const { data, status } = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log(data);
    return NextResponse.json(data, { status });
  } catch (err) {
    console.error(err);
  }
}
