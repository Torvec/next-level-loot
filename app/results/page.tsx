async function searchResults() {
  const response = await fetch(
    `https://api.rawg.io/api/platforms?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch platforms");
  }
  return response.json();
}

export default async function Results() {
  const data = await searchResults();
  //   console.log(data);

  return (
    <main className="grid h-screen place-content-center bg-slate-600">
      <h2>Search Results:</h2>
      <ul>
        {/* @ts-ignore */}
        {data.results.map((platform) => (
          <li key={platform.id}>
            {platform.name} - {platform.games_count}
          </li>
        ))}
      </ul>
    </main>
  );
}
