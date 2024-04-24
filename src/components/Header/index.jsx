import sino from '../../assets/sino.svg'
import mapa from '../../assets/loc.svg'
import pesquisa from '../../assets/pesquisa.svg'
import './header.css'
import Pesquisa from '../Pesquisa/pesquisa'
import { useUserContext } from '../../contexts/UserContext'
import { Link } from 'react-router-dom'

const Header = () => {

  const { findUserByEmail } = useUserContext();
  const user = findUserByEmail();
  
  return (
    <header className='header'>
        <div className="titulo-home">
          <h1>Olá, {user.name}</h1>
          <Link to="/notificacoes">
            <img src={sino} />
          </Link>
        </div>
        <Pesquisa 
          img={pesquisa} 
          placeholder={'Para onde?'} 
          type={'text'}
          color={"white"}
        />
      </header>
  )
}

export default Header