import HeaderFixo from "../../../../components/HeaderFixo/headerFixo";

import "./styles.css";

export function ViewDocs() {
  return (
    <div className="documentos-view-container">
      <HeaderFixo text={"Documentos"} tela={"perfil"} />
      <div className="card-doc-list">
        <h1>CNH (Ativa)</h1>
        <p className="documentos-view-texto">
          Vencimento: <span>XX/XX/XXXX</span>
        </p>
      </div>
      <div className="card-doc-list">
        <span className="box-list-doc-dot"></span>
        <h1>CRLV (Pendente)</h1>
        <p className="documentos-view-texto">
          O documento renovado deve ser enviado
        </p>
      </div>
    </div>
  );
}
