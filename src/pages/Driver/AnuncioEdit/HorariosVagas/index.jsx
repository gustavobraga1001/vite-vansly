import React, { useState } from 'react';
import Swal from 'sweetalert2';  // Biblioteca de popup
import HeaderFixo from "../../../../components/HeaderFixo/headerFixo";
import "./styles.css";

export function HorariosVagas() {
    const [formData, setFormData] = useState({
        periodo: '',
        horario: '',
        vagas: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pega os anúncios existentes ou inicializa um array vazio
        let anuncios = JSON.parse(localStorage.getItem('anuncios_horarios')) || [];

        // Cria o novo anúncio com o formato especificado
        const newHorario = {
            [formData.periodo]: {
                horario: formData.horario,
                vagas: formData.vagas
            }
        };

        // Adiciona o novo horário ao array de anúncios
        anuncios.push({ id: anuncios.length + 1, horarios: newHorario });
        localStorage.setItem('anuncios_horarios', JSON.stringify(anuncios));

        // Exibe o popup estiloso com SweetAlert2
        Swal.fire({
            title: 'Sucesso!',
            text: 'Horário adicionado com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Reseta os campos do formulário
        setFormData({
            periodo: '',
            horario: '',
            vagas: ''
        });
    };

    return (
        <div>
            <HeaderFixo tela={"motorista/anuncio-edit"} text={"Criação de anúncio"} />
            <form className="form-horarios" onSubmit={handleSubmit}>
                <div className="periodo-box">
                    <h2>Período</h2>
                    <div>
                        <input
                            type="radio"
                            name="periodo"
                            id="manha"
                            value="manha"
                            checked={formData.periodo === 'manha'}
                            onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                        />
                        <label htmlFor="manha">Manhã</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="periodo"
                            id="tarde"
                            value="tarde"
                            checked={formData.periodo === 'tarde'}
                            onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                        />
                        <label htmlFor="tarde">Tarde</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="periodo"
                            id="noite"
                            value="noite"
                            checked={formData.periodo === 'noite'}
                            onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                        />
                        <label htmlFor="noite">Noite</label>
                    </div>
                </div>

                <div className="horario-box">
                    <h2>Horário</h2>
                    <select
                        name="horario"
                        value={formData.horario}
                        onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    >
                        <option value="">Selecione</option>
                        <option value="07:00">07:00</option>
                        <option value="13:00">13:00</option>
                        <option value="17:00">17:00</option>
                    </select>
                </div>

                <div className="qtd-box">
                    <h2>Quantidade de vagas disponíveis</h2>
                    <input
                        type="number"
                        name="vagas"
                        placeholder="Qtd. de vagas disponíveis"
                        value={formData.vagas}
                        onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
                    />
                </div>

                <div className="box-fix-button">
                    <input type="submit" value="Adicionar Horário" />
                </div>
            </form>
        </div>
    );
}
