import { NextRequest, NextResponse } from "next/server";

import searchGames from "@/app/old/search";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") ?? "";

  return NextResponse.json(await searchGames(query));
}
