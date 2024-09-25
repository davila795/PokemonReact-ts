import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import type { Pokemon, PokemonDetail } from "./types";
import PokemonTable from "./components/PokemonTable";
import PokemonCard from "./components/PokemonCard";

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
  const [data, setData] = useState<PokemonDetail[]>([]);
  const [pokemon, setPokemon] = useState<PokemonDetail>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const options: RequestInit = {
      method: "GET",
    };

    fetch("https://pokeapi.co/api/v2/pokemon?limit=100", options)
      .then((response) => response.json())
      .then((data: PokemonAPI) => {
        const fetches = data.results.map((result) =>
          fetch(result.url, options).then((response) => response.json())
        );

        Promise.all(fetches)
          .then((pokemons: Pokemon[]) => {
            const pokemonsDetailed = pokemons.map((pokemon) => {
              const pokemonDetail: PokemonDetail = {
                id: pokemon.id,
                abilities: pokemon.abilities,
                height: pokemon.height,
                name: pokemon.name,
                sprites: pokemon.sprites,
                stats: pokemon.stats,
                weight: pokemon.weight,
              };

              return pokemonDetail;
            });
            setData(pokemonsDetailed);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const showPokemonDetails = (pokemon: PokemonDetail): void => {
    setPokemon(pokemon);
    handleShow();
  };
  const handleShow = (): void => setShow(true);
  const handleClose = (): void => setShow(false);

  return (
    <>
      <Container style={{ margin: "20px auto", maxWidth: "768px" }}>
        <h1 style={{ textAlign: "center" }}>Pokemons</h1>
        {data && (
          <PokemonTable data={data} showPokemonDetails={showPokemonDetails} />
        )}
      </Container>

      {pokemon && (
        <PokemonCard pokemon={pokemon} handleClose={handleClose} show={show} />
      )}
    </>
  );
}

export default App;
