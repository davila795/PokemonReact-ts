import { Card, ListGroup, Modal } from "react-bootstrap";
import type { PokemonDetail } from "../types";

type PokemonDetailProps = {
  show: boolean;
  handleClose: () => void;
  pokemon: PokemonDetail;
};

export default function PokemonCard({
  show,
  handleClose,
  pokemon,
}: PokemonDetailProps) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: "#3c3c3c" }}
      >
        <Card>
          <Card.Img variant="top" src={pokemon.sprites.back_default} />
          <ListGroup
            className="list-group-flush"
            style={{ textAlign: "center" }}
          >
            <ListGroup.Item>ID: {pokemon.id}</ListGroup.Item>
            <ListGroup.Item>HEIGHT: {pokemon.height}</ListGroup.Item>
            <ListGroup.Item>WEIGHT: {pokemon.weight}</ListGroup.Item>
          </ListGroup>
        </Card>
      </Modal>
    </>
  );
}
