import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PokemonTable from "./components/PokemonTable/PokemonTable";

import type { PokemonDetail } from "./types";

type PokemonAPI = {
  count: number;
  next: string;
  previous: null;
  results: Result[];
};

type Result = {
  name: string;
  url: string;
};

function App() {
  const [pokemonData, setPokemonData] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json())
      .then((data: PokemonAPI) => {
        const fetches = data.results.map((result) =>
          fetch(result.url).then((response) => response.json())
        );
        Promise.all(fetches)
          .then((pokemonData: PokemonDetail[]) => setPokemonData(pokemonData))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container style={{ margin: "20px auto", maxWidth: "768px" }}>
        <h1 style={{ textAlign: "center" }}>Pokemons</h1>
        {pokemonData && <PokemonTable data={pokemonData} />}
      </Container>
    </>
  );
}

export default App;
