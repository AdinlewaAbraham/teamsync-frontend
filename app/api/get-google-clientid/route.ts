import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const clientID = process.env.GOOGLE_CLIENTID;
    if (clientID) {
      return NextResponse.json({ clientID });
    } else {
      return NextResponse.json(
        {
          message:
            "get your google clientID and set it in your env file(both locally and on your deployed app)",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch data" + error });
  }
}
