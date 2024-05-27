import React from 'react'
import './TabelaHorarios.css'

const TabelaHorarios = ({ horarios }) => {
  return (
    <div className='table-box'>
        <table>
        <thead>
            <tr>
                <th>Período</th>
                <th>Horário</th>
                <th>Vagas disp.</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Manhã</td>
                <td>{horarios.manha.horario}</td>
                <td>{horarios.manha.vagas}</td>
            </tr>
            <tr>
                <td>Tarde</td>
                <td>{horarios.tarde.horario}</td>
                <td>{horarios.tarde.vagas}</td>
            </tr>
            <tr>
                <td>Noite</td>
                <td>{horarios.noite.horario}</td>
                <td>{horarios.noite.vagas}</td>
            </tr>
        </tbody>
    </table>
        </div>
  )
}

export default TabelaHorarios