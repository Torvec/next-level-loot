export default async function freeGamesQuery(formData: FormData) {
  const platform = formData.get("platform");
  const type = formData.get("type");
  const sort = formData.get("sort");
  const response = await fetch(
    `https://gamerpower.p.rapidapi.com/api/giveaways?platform=${platform}&type=${type}&sort-by=${sort}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${process.env.GAMERPOWER_API_KEY}`,
        "x-rapidapi-host": "gamerpower.p.rapidapi.com",
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;

  //   const gamerpowerGiveawaysURL =
  //     "https://gamerpower.p.rapidapi.com/api/giveaways";

  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-key": `${process.env.GAMERPOWER_API_KEY}`,
  //       "x-rapidapi-host": "gamerpower.p.rapidapi.com",
  //     },
  //   };

  //   async function fetchFreeGames() {
  //     try {
  //       const response = await fetch(gamerpowerGiveawaysURL, options);
  //       const result = await response.json();
  //       return result;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
}
