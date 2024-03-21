import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const dataSource = "http://localhost:5001/test";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { data, status } = await axios.post(dataSource, await req.json());

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch data" + error });
  }
}
