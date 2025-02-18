import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import { UserCircleMinus, DotsThreeVertical } from "@phosphor-icons/react";
import imgFalta from "../../assets/img-falta.svg";
import "./Faltas.css";
import { useQuery } from "react-query";
import useAuth from "../../contexts/AuthProvider/useAuth";
import Api from "../../contexts/AuthProvider/services/api";

// Função para buscar as ausências do usuário
const fetchAbsencesWithBody = async (userId) => {
  try {
    const response = await Api.post('/get-absences', { userId });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar ausências: ' + error.message);
  }
};

// Função para formatar a data
const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Verifica se a data é válida
  if (isNaN(date)) {
    return "Data inválida";
  }

  // Garantir que a data está no formato correto: DD-MM-YYYY
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() retorna 0-11
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};


export function Faltas() {
  const auth = useAuth();

  // Query para obter o usuário
  const { data: userData, isLoading: isLoadingUser } = useQuery(
    ["user"],
    () => auth.getUser(),
    { staleTime: 10000 }
  );

  const user = userData?.user;

  // Query para buscar as ausências
  const { data, isLoading: isLoadingAbsences, error } = useQuery(
    ["absences", user?.id],
    () => user?.id ? fetchAbsencesWithBody(user.id) : [],
    { staleTime: 20000, enabled: !!user }
  );

  // Garante que `absences` seja sempre um array
  const absences = data?.absences || [];

  // Se o usuário ou as ausências estão carregando
  if (isLoadingUser || isLoadingAbsences) {
    return <p>Carregando...</p>;
  }

  // Se ocorrer um erro
  if (error) {
    return <p>Erro ao carregar as ausências.</p>;
  }

  // Verificando se há ausências
  const hasAbsences = absences.length > 0;

  console.log(absences)

  return (
    <div>
      <HeaderFixo text={"Informar ausência"} tela="home" />
      <main className="main-faltas">
        {user.cnh ? (
          <div>
            <h1>Você não tem acesso a essa página</h1>
          </div>
        ) : (
          <>
            {hasAbsences && (
              <>
                <p className="title-faltas">Ausências</p>
                <div className="list-faltas">
                  {absences.map((ausencia) => (
                    <div className="card-faltas" key={ausencia.id}>
                      <div>
                        <UserCircleMinus size={36} color="#003B6D" />
                        <span>{formatDate(ausencia.date_of_absence)}</span>
                      </div>
                      <DotsThreeVertical size={32} color="#AAAAAA" weight="bold" />
                    </div>
                  ))}
                </div>
              </>
            )}

            {!hasAbsences && (
              <>
                <img src={imgFalta} alt="Nenhuma ausência registrada" />
                <h2>Nenhuma ausência registrada</h2>
                <span>
                  Até o momento você não informou nenhuma ausência a seu motorista.
                </span>
              </>
            )}

            <Link to={"informar-faltas"}>
              <button>Informar ausência</button>
            </Link>
          </>
        )}
      </main>

      <Footer home={false} presenca={true} percurso={false} perfil={false} />
    </div>
  );
}
