import { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import useAuth from '../hooks/useAuth'
import Login from '../pages/Login'
import Busca from '../pages/Busca/busca'

const Private = ({ Item }) => {
    const {signed} = useAuth();

    return signed > 0 ? <Item /> : <Login/>
}

const RoutesApp = () => {
  return (
    <BrowserRouter>
        <Fragment>
            <Routes>
                <Route exact path='/home' element={<Private Item={Home} /> }/>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='*' element={<Login />} />
                <Route path='/busca' element={<Busca />} />
            </Routes>
        </Fragment>
    </BrowserRouter>
  )
}

export default RoutesApp