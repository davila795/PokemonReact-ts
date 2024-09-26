import { memo } from "react";
import { Button } from "react-bootstrap";
import type { PokemonDetail } from "../../types";

type TableRowProps = {
  pokemon: PokemonDetail;
  handlePokemonClick: (pokemon: PokemonDetail) => void;
};

function TableRow({ pokemon, handlePokemonClick }: TableRowProps) {
  return (
    <tr >
      <td>{pokemon.name}</td>
      <td>
        <Button onClick={() => handlePokemonClick(pokemon)}>Detalles</Button>
      </td>
      <td>
        <img src={pokemon.sprites.back_default} alt={pokemon.name} />
      </td>
    </tr>
  );
}

export default memo(TableRow);
