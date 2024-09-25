import { memo } from "react";
import { Button, Table } from "react-bootstrap";
import type { PokemonDetail } from "../types";

type PokemonTableProps = {
  data: PokemonDetail[];
  showPokemonDetails: (pokemon: PokemonDetail) => void;
};

function PokemonTable({ data, showPokemonDetails }: PokemonTableProps) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((pokemon) => {
          return (
            <tr key={pokemon.id}>
              <td>{pokemon.name}</td>
              <td>
                <Button onClick={() => showPokemonDetails(pokemon)}>
                  Detalles
                </Button>
              </td>
              <td>
                <img src={pokemon.sprites.back_default} alt={pokemon.name} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default memo(PokemonTable);
