import notificacaoImg from "../../assets/notificacoes.svg";
import cartaoImg from "../../assets/cartao.svg";
import contratosImg from "../../assets/contratos.svg";
import volanteImg from "../../assets/volante.svg";
import logOutImg from "../../assets/logOut.svg";

const opcoes = [
  {
    img: notificacaoImg,
    text: "Notificações",
    link: "/notificacoes",
  },
  {
    img: contratosImg,
    text: "Contratos",
    link: "/contratos",
  },
  // {
  //   img: volanteImg,
  //   text: "Seja um motorista",
  //   link: "/motorista",
  // },
  {
    img: logOutImg,
    text: "Log Out",
    onClick: true,
    link: "/login",
  },
];

export default opcoes;
