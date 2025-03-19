import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { UserCircleMinus, DotsThreeVertical } from "@phosphor-icons/react";
import Footer from "../../components/Footer";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import Loading from "../../components/Loading";
import useAuth from "../../contexts/AuthProvider/useAuth";
import Api from "../../contexts/AuthProvider/services/api";
import imgFalta from "../../assets/img-falta.svg";
import "./Faltas.css";

const fetchAbsencesWithBody = async (userId) => {
  try {
    const response = await Api.post('/get-absences', { userId });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Erro ao buscar ausências'
    );
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "Data inválida";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Data inválida";

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

export function Faltas() {
  const auth = useAuth();

  const { data: userData, isLoading: isLoadingUser } = useQuery(
    ["user-data"],
    () => auth.getUser(),
    { staleTime: 10000 }
  );

  const user = userData?.user;

  const {
    data,
    isLoading: isLoadingAbsences,
    error,
    refetch
  } = useQuery(
    ["absences", user?.id],
    () => fetchAbsencesWithBody(user.id),
    { staleTime: 20000, enabled: !!user?.id }
  );

  const absences = data?.absences || [];
  const hasAbsences = absences.length > 0;

  if (isLoadingUser || isLoadingAbsences) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <p>Erro ao carregar as ausências: {error.message}</p>
        <button onClick={() => refetch()}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div>
      <HeaderFixo text="Informar ausência" tela="home" />
      <main className="main-faltas">
        {user?.cnh ? (
          <h1>Você não tem acesso a essa página</h1>
        ) : (
          <>
            {hasAbsences ? (
              <>
                <p className="title-faltas">Ausências</p>
                <ul className="list-faltas">
                  {absences.map((ausencia) => (
                    <li className="card-faltas" key={ausencia.id}>
                      <div>
                        <UserCircleMinus size={36} color="#003B6D" />
                        <span>{formatDate(ausencia.date_of_absence)}</span>
                      </div>
                      <DotsThreeVertical size={32} color="#AAAAAA" weight="bold" />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <img src={imgFalta} alt="Nenhuma ausência registrada" />
                <h2>Nenhuma ausência registrada</h2>
                <span>
                  Até o momento você não informou nenhuma ausência a seu motorista.
                </span>
              </>
            )}

            <Link to="informar-faltas">
              <button aria-label="Informar ausência">Informar ausência</button>
            </Link>
          </>
        )}
      </main>
      <Footer home={false} presenca={true} percurso={false} perfil={false} />
    </div>
  );
}
