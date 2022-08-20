import React from "react";
import { realizarSorteio } from "./realizarSorteio";

describe("dado um sorteio de amigo secreto", () => {
  test("cada participante não sorteie o próprio nome", () => {
    const participantes = ["Ana", "Catarina", "Jão", "Lucas", "Rosy"];

    const sorteio = realizarSorteio(participantes);
    participantes.forEach((item) => {
      const amigoSecreto = sorteio.get(item);
      expect(amigoSecreto).not.toEqual(item);
    });
  });
});
