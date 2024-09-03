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

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/signupName" element={<SignupName />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Private Item={Home} />} />
          <Route path="/busca" element={<Busca />} />
          <Route path="/anuncio" element={<Anuncio />} />
          {/* <Route path="/percurso" element={<Percurso />} /> */}
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/anuncio/:id" element={<Anuncio />} />
          <Route path="/contrato/locais/:id" element={<Locais />} />
          <Route path="/contrato/info/:id" element={<InfoContrato />} />
          <Route path="/proposta" element={<Proposta />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/contratos/:id" element={<VerificarContrato />} />
          <Route path="/motorista" element={<Motorista />} />
          <Route path="/faltas" element={<Faltas />} />
          <Route path="/faltas/informar-faltas" element={<InfomarFalta />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
