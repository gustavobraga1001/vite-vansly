import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
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
import { HorariosVagas } from "../pages/Driver/AnuncioEdit/HorariosVagas";
import { EditarPerfil } from "../pages/Perfil/EditarPerfil";
import { Estatisticas } from "../pages/Driver/Estatisticas";
import { jwtDecode } from "jwt-decode";
import ImgurUploader from "../services/ingur-config";


const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/image-test" element={<ImgurUploader />} />

          <Route path="/" element={<Login />} />
          <Route path="/signupName" element={<SignupName />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil /> } />          
          <Route path="/anuncio/:announcementId" element={<Anuncio/>} />
          <Route path="/faltas" element={<Faltas />} />
          <Route
            path="/faltas/informar-faltas"
            element={<InfomarFalta />}
          />
          <Route
            path="/contrato/locais/:id"
            element={<Locais />}
          />
          <Route
            path="/contrato/info/:id"
            element={<InfoContrato />}
          />
          <Route path="/proposta" element={<Proposta />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route
            path="/contratos/:id"
            element={<VerificarContrato />}
          />
          <Route path="/percurso" element={<Percurso />} />
          <Route path="/motorista" element={<Motorista />} />
          <Route
            path="/motorista/documentos"
            element={<Documentos />}
          />
          <Route
            path="/motorista/veiculo"
            element={<Veiculo />}
          />
          <Route
            path="/motorista/veiculo-infos"
            element={<InfoVeiculo />}
          />
          <Route
            path="/estatisticas"
            element={<Estatisticas />}
          /> 
        {/* <Route path="/busca" element={<Private Item={Busca} />} />
          <Route
            path="/editar-perfil"
            element={<Private Item={EditarPerfil} />}
          />
          <Route
            path="/notificacoes"
            element={<Private Item={Notificacoes} />}
          />

          <Route
            path="/motorista/documentos-view"
            element={<Private Item={ViewDocs} />}
          />
          <Route
            path="/motorista/anuncio-edit"
            element={<Private Item={AnuncioEdit} />}
          />
          <Route
            path="/motorista/anuncio-edit/horarios-vagas"
            element={<Private Item={HorariosVagas} />}
          />
            */}
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
