const fetchGames = async function () {
  const rasp = await fetch("https://www.cheapshark.com/api/1.0/games?id=612");
  let jocuri = await rasp.json();

  const jocuriArr = jocuri;

  console.log(jocuriArr);
};

fetchGames();
