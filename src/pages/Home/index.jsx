import "./home.css";
import Footer from "../../components/Footer";
import BemVindo from "../../components/BemVindo";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { useQuery } from "react-query";
import Api from "../../contexts/AuthProvider/services/api";
import useAuth from "../../contexts/AuthProvider/useAuth";
import {HomeDriver} from "../Driver/Home/index"

const Home = () => {
  const { data: annocements, isLoading } = useQuery(
    ["announcements"],
    () => Api.get("get-announcements"),
    {
      staleTime: 10000,
    }
  );

  const { data: userData, isLoading: isLoadingUser } = useQuery(
    ["user"],
    () => Api.get("me")
  );
  
  
  if (isLoading || !annocements || !userData || isLoadingUser) {
    return <p>Carregando...</p>;
  }  
  const user = userData?.data?.user || {};
  
  const announcemnts = annocements.data.announcements;

  return (
    !user.cnh ? (
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
                    images={info.images}
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
      </div>
    ) : (
      <HomeDriver />
    )
  );
};

export default Home;
