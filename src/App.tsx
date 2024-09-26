import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import PokemonTable from "./components/PokemonTable/PokemonTable";

import type { Pokemon, PokemonDetail } from "./types";

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
          .then((pokemonSchemaData: Pokemon[]) => {
            const pokemonData: PokemonDetail[] = pokemonSchemaData.map(
              (pokemonSchema) => {
                return {
                  id: pokemonSchema.id,
                  abilities: pokemonSchema.abilities,
                  height: pokemonSchema.height,
                  name: pokemonSchema.name,
                  sprites: pokemonSchema.sprites,
                  stats: pokemonSchema.stats,
                  weight: pokemonSchema.weight,
                };
              }
            );
            setPokemonData(pokemonData);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container style={{ margin: "20px auto", maxWidth: "1100px" }}>
        <h1 style={{ textAlign: "center" }}>Pokemons</h1>
        {pokemonData.length === 0 ? (
          <div style={{ maxWidth: "fit-content", margin: "50% auto" }}>
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <PokemonTable data={pokemonData} />
        )}
      </Container>
    </>
  );
}

export default App;
