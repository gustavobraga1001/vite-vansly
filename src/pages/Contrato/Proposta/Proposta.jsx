import propostaImg from "../../../assets/proposta.svg"
import Loading from "../../../components/Loading";
import './Proposta.css'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Proposta = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
          navigate('/home'); // substitua '/outra-tela' pelo caminho da tela para onde deseja redirecionar
        }, 5000); // 5000 milissegundos = 5 segundos
    
        return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado ou atualizado
      }, [navigate]);
  return (
    <div className='container-proposta'>
        <img src={propostaImg} alt="" />
        <h1>Proposta Enviada!</h1>
        <p>Sua proposta será enviada ao motorista para análise
            caso rejeitada você receberá uma mensagem.
        </p>
        <Loading />
    </div>
  )
}

export default Proposta