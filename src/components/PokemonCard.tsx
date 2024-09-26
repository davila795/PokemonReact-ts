import { Card, Modal } from "react-bootstrap";
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
      <Modal show={show} onHide={handleClose} centered size="sm">
        <Card border="dark" bg="light" text="dark">
          <Card.Img variant="top" src={pokemon.sprites.back_default} />
          <Card.Body style={{ padding: "0" }}>
            <Card.Title style={{ textAlign: "center" }}>
              {pokemon.name.toLocaleUpperCase()}
            </Card.Title>
            <Card.Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "1.2rem",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  borderTop: "1px solid #333",
                }}
              >
                <p>{pokemon.height}m</p>
                <p>{pokemon.weight}kg</p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
}
