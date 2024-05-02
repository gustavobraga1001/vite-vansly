import returnImg from "../../assets/Return.svg";
import telaNotify from "../../assets/tela-notify.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import "./Notificacoes.css";

const Notificacoes = () => {
  return (
    <div className="notificacao-container">
      <HeaderFixo tela={"home"} img={returnImg} text={"Notificações"} />
      <div className="notificacao-box">
        <img src={telaNotify} alt="" />
        <p>Você ainda não recebeu nenhuma notificação</p>
      </div>
    </div>
  );
};

export default Notificacoes;
