import { NextRequest, NextResponse } from "next/server";

async function searchGames(slug: string) {
  const rawgAPIKey = process.env.RAWG_API_KEY;

  if (!rawgAPIKey) {
    throw new Error("No RAWG API key found");
  }

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${rawgAPIKey}&search=${slug}&platforms=18,1,7`,
  );

  const { results } = await response.json();

  return results;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") ?? "";

  return NextResponse.json(await searchGames(query));
}
