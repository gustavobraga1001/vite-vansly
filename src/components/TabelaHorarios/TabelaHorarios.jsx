import React from 'react'
import './TabelaHorarios.css'

const TabelaHorarios = ({ capacityVehicle }) => {
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
                <td>7:00</td>
                <td>{capacityVehicle.capacityVehicle.Manha}</td>
            </tr>
            <tr>
                <td>Tarde</td>
                <td>13:00</td>
                <td>{capacityVehicle.capacityVehicle.Tarde}</td>
            </tr>
            <tr>
                <td>Noite</td>
                <td>19:00</td>
                <td>{capacityVehicle.capacityVehicle.Noite}</td>
            </tr>
        </tbody>
    </table>
        </div>
  )
}

export default TabelaHorarios