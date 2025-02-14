import "./home.css";
import Footer from "../../components/Footer";
import BemVindo from "../../components/BemVindo";
import Card from "../../components/Card";
import Header from "../../components/Header";
import infoCards from "./infoCard";
import useAuth from "../../hooks/useAuth";
import { HomeDriver } from "../Driver/Home";

const Home = () => {

  return (
    <div className="box-home">
      <Header />
      <main className="conteudo-home">
        <BemVindo />
        <h3>Rotas disponíveis</h3>
        <div className="cards">
          {infoCards.map((info, i) => (
            <Card
              key={i}
              id={info.id}
              img={info.img}
              title={info.title}
              local={info.local}
              preco={info.preco}
              stars={info.stars}
            />
          ))}
        </div>
      </main>
      <Footer home={true} presenca={false} percurso={false} perfil={false} />
    </div >
  ) 
  //   <HomeDriver />
  // )

};

export default Home;
