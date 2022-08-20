import { FormEvent, useState } from "react";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";

const Sorteio = () => {
  const [participanteDaVez, setParticipanteDaVez] = useState("");
  const [amigoSecreto, setAmigoSecreto] = useState("");
  const participantes = useListaDeParticipantes();
  const resultado = useResultadoSorteio();

  const sortear = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez) as string);
    }
  };

  return (
    <section>
      <form onSubmit={sortear}>
        <select
          required
          name="participanteDavez"
          id="participanteDavez"
          placeholder="Selecione o seu nome"
          value={participanteDaVez}
          onChange={(event) => setParticipanteDaVez(event.target.value)}
        >
          <option value="">Selecione o seu nome</option>
          {participantes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <button>Sortear</button>
      </form>
      {amigoSecreto && <p role="alert">{amigoSecreto}</p>}
    </section>
  );
};

export default Sorteio;
