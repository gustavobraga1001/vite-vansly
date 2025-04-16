import "./home.css";
import Footer from "../../components/Footer";
import BemVindo from "../../components/BemVindo";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { useQuery } from "react-query";
import Api from "../../contexts/AuthProvider/services/api";
import { HomeDriver } from "../Driver/Home/index";

const Home = () => {
  const { data: userData, isLoading: isLoadingUser } = useQuery(
    ["user"],
    () => Api.get("me")
  );

  const { data: announcementsData, isLoading } = useQuery(
    ["announcements"],
    () => Api.get("get-announcements"),
    {
      staleTime: 10000,
    }
  );

  // 🔥 Retorna null enquanto o user não está definido
  if (isLoading || isLoadingUser || !userData?.data?.user) {
    return null;
  }

  const user = userData.data.user;
  const announcements = announcementsData?.data?.announcements || [];

  // 🔥 Se user tiver `cnh`, renderiza o componente específico
  if (user.cnh) {
    return <HomeDriver />;
  }

  return (
    <div className="box-home">
      <Header />
      <main className="conteudo-home">
        <BemVindo />
        {announcements.length > 0 ? (
          <>
            <h3>Rotas disponíveis</h3>
            {announcements.map((info) => (
              <div className="cards" key={info.id}>
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
  );
};

export default Home;
