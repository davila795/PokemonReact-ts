import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PokemonTable from "./components/PokemonTable";
import PokemonCard from "./components/PokemonCard";

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
  const [pokemon, setPokemon] = useState<PokemonDetail>();
  const [show, setShow] = useState(false);

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

  const showPokemonDetails = useCallback((pokemon: PokemonDetail): void => {
    setPokemon(pokemon);
    handleShow();
  }, []);
  const handleShow = (): void => setShow(true);
  const handleClose = (): void => setShow(false);

  return (
    <>
      <Container style={{ margin: "20px auto", maxWidth: "768px" }}>
        <h1 style={{ textAlign: "center" }}>Pokemons</h1>
        {pokemonData && (
          <PokemonTable
            data={pokemonData}
            showPokemonDetails={showPokemonDetails}
          />
        )}
      </Container>

      {pokemon && (
        <PokemonCard pokemon={pokemon} handleClose={handleClose} show={show} />
      )}
    </>
  );
}

export default App;
