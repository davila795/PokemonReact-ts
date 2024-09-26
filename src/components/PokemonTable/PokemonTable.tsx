import { useCallback, useState } from "react";
import { Table } from "react-bootstrap";
import PokemonCard from "../PokemonCard";
import TableRow from "./TableRow";

import type { PokemonDetail } from "../../types";

type PokemonTableProps = {
  data: PokemonDetail[];
};

function PokemonTable({ data }: PokemonTableProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [showPokemon, setShowPokemon] = useState(false);

  const handlePokemonClick = useCallback((pokemon: PokemonDetail) => {
    setSelectedPokemon(pokemon);
    setShowPokemon(true);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPokemon(null);
    setShowPokemon(false);
  }, []);

  return (
    <>
      <Table striped bordered hover variant="dark" >
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((pokemon) => (
            <TableRow
              key={pokemon.id}
              pokemon={pokemon}
              handlePokemonClick={handlePokemonClick}
            />
          ))}
        </tbody>
      </Table>

      {selectedPokemon && (
        <PokemonCard
          pokemon={selectedPokemon}
          handleClose={handleClose}
          show={showPokemon}
        />
      )}
    </>
  );
}

export default PokemonTable;
