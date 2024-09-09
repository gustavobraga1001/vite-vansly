import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import useAuth from "../hooks/useAuth";
import Login from "../pages/Login";
import Busca from "../pages/Busca/busca";
import Anuncio from "../pages/Anuncio/Anuncio";
import Percurso from "../pages/Percurso/percurso";
import Perfil from "../pages/Perfil/Perfil";
import Locais from "../pages/Contrato/Locais/Locais";
import InfoContrato from "../pages/Contrato/InfoContrato/InfoContrato";
import Proposta from "../pages/Contrato/Proposta/Proposta";
import SignupName from "../pages/SignupName/SignupName";
import Notificacoes from "../pages/Notificacoes/Notificacoes";
import Contratos from "../pages/Contratos/Contratos";
import Motorista from "../pages/Motorista/Motorista";
import { Faltas } from "../pages/Faltas/Faltas";
import { InfomarFalta } from "../pages/Faltas/InformarFalta/InformarFalta";
import { VerificarContrato } from "../pages/Contratos/VerificarContrato/VerificarContrato";
import { Documentos } from "../pages/Driver/Documentos";
import { Veiculo } from "../pages/Driver/Veiculo";
import { InfoVeiculo } from "../pages/Driver/Veiculo/Infos";
import { ViewDocs } from "../pages/Driver/Documentos/ViewDocs";
import { AnuncioEdit } from "../pages/Driver/AnuncioEdit";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signupName" element={<SignupName />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<Private Item={Home} />} />

          <Route path="/home" element={<Private Item={Home} />} />
          <Route path="/busca" element={<Private Item={Busca} />} />
          {/* <Route path="/percurso" element={<Percurso />} /> */}
          <Route path="/perfil" element={<Private Item={Perfil} />} />
          <Route path="/anuncio/:id" element={<Private Item={Anuncio} />} />
          <Route
            path="/contrato/locais/:id"
            element={<Private Item={Locais} />}
          />
          <Route
            path="/contrato/info/:id"
            element={<Private Item={InfoContrato} />}
          />
          <Route path="/proposta" element={<Private Item={Proposta} />} />
          <Route
            path="/notificacoes"
            element={<Private Item={Notificacoes} />}
          />
          <Route path="/contratos" element={<Private Item={Contratos} />} />
          <Route
            path="/contratos/:id"
            element={<Private Item={VerificarContrato} />}
          />
          <Route path="/faltas" element={<Private Item={Faltas} />} />
          <Route
            path="/faltas/informar-faltas"
            element={<Private Item={InfomarFalta} />}
          />

          <Route path="/motorista" element={<Private Item={Motorista} />} />
          <Route
            path="/motorista/documentos"
            element={<Private Item={Documentos} />}
          />
          <Route
            path="/motorista/veiculo"
            element={<Private Item={Veiculo} />}
          />
          <Route
            path="/motorista/veiculo-infos"
            element={<Private Item={InfoVeiculo} />}
          />
          <Route
            path="/motorista/documentos-view"
            element={<Private Item={ViewDocs} />}
          />
          <Route
            path="/motorista/anuncio-edit"
            element={<Private Item={AnuncioEdit} />}
          />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
