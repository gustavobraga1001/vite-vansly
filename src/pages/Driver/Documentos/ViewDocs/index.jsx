import { useQuery } from "react-query";
import HeaderFixo from "../../../../components/HeaderFixo/headerFixo";
import useAuth from "../../../../contexts/AuthProvider/useAuth";

import "./styles.css";
import Loading from "../../../../components/Loading";

export function ViewDocs() {

  const auth = useAuth();

  const { data, isLoading } = useQuery(["user"], () => auth.getUser());  

  const user = data?.user;
  
  if (isLoading || !user) {
    return <Loading />;
  }

  const images = user.docs_images

  console.log(images)

  return (
    <div className="documentos-view-container">
      <HeaderFixo text={"Documentos"} tela={"perfil"} />
      {images.map((image) => {
        const expirationDate = new Date(new Date(image.created_at).setFullYear(new Date(image.created_at).getFullYear() + 1))
        const isExpired = new Date() > expirationDate

        return (
          <div className="card-doc-list" key={image.id}>
            <h1>{image.name} (Ativa)</h1>
            {isExpired ? (
              <span className="box-list-doc-dot"></span>
            ): ""}
            <p className="documentos-view-texto">
              {isExpired ? (
                <span className="documento-expirado">O documento renovado deve ser enviado</span>
              ) : (
                <>
                  Vencimento:{" "}
                  <span>
                    {expirationDate.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    })}
                  </span>
                </>
              )}
            </p>
          </div>
        )
      })}
    </div>
  );
}
