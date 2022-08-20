import { useNavigate } from "react-router-dom";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useSorteador } from "../state/hook/useSorteador";

const Rodape = () => {
  const participantes = useListaDeParticipantes();
  const navigarPara = useNavigate();
  const sortear = useSorteador();

  const iniciar = () => {
    sortear();
    navigarPara("/sorteio");
  };

  return (
    <footer>
      <button disabled={participantes.length < 3} onClick={iniciar}>
        Iniciar brincadeira
      </button>
    </footer>
  );
};

export default Rodape;
