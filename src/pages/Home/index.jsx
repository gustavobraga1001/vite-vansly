import "./home.css";
import Footer from "../../components/Footer";
import BemVindo from "../../components/BemVindo";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { HomeDriver } from "../Driver/Home";

const Home = () => {

  const infoCards = []

  return (
    <div className="box-home">
      <Header />
      <main className="conteudo-home">
        <BemVindo />
        {infoCards.length > 0 ? (
        <>
          <h3>Rotas disponíveis</h3>
          {infoCards.map((info, i) => (
            <div className="cards" key={i}>
              <Card
                id={info.id}
                img={info.img}
                title={info.title}
                local={info.local}
                preco={info.preco}
                stars={info.stars}
              />
            </div>
          ))}
        </>
      ) : (
        <p>Nenhum anúncio disponível</p>
      )}
      </main>
      <Footer home={true} presenca={false} percurso={false} perfil={false} />
    </div >
  ) 
  //   <HomeDriver />
  // )

};

export default Home;
