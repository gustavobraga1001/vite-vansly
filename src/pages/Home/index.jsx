import "./home.css";
import Footer from "../../components/Footer";
import BemVindo from "../../components/BemVindo";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { HomeDriver } from "../Driver/Home";
import axios from "axios";
import { useQuery } from "react-query";
import Api from "../../contexts/AuthProvider/services/api";

const Home = () => {

  const infoCards = []

  const { data , isLoading } = useQuery(
    ["announcements"], 
    () => Api.get("get-announcements"),
    {
      staleTime: 10000, // Define o tempo até que a consulta se torne "obsoleta"
    }
  );

  if (isLoading || !data) {
    return <p>Carregando...</p>;
  }

  const announcemnts = data.data.announcements

  console.log(data.data.announcements)

  return (
    <div className="box-home">
      <Header />
      <main className="conteudo-home">
        <BemVindo />
        {announcemnts.length > 0 ? (
        <>
          <h3>Rotas disponíveis</h3>
          {announcemnts.map((info, i) => (
            <div className="cards" key={i}>
              <Card
                id={info.id}
                // img={info.img}
                title={info.title}
                local={info.city}
                preco={info.monthlyAmount}
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
