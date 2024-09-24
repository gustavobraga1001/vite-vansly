import { FooterDriver } from "../../../components/FooterDriver";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";

export function PercursoDriver() {
    return (
        <div>
            <HeaderFixo tela="home" text="Percurso" />


            <div className="container-percurso">
                <div className="container-item-percurso">
                    <p>16:43</p>
                    <div className="container-barra"><div className="bola-barra"></div> <span className="traco-barra"></span></div>
                    <div>
                        <p>Rua das figuerias, 150</p>
                        <span>Jardim Bela vista</span>
                    </div>
                </div>

                <div className="container-item-percurso">
                    <p>16:43</p>
                    <div className="container-barra"><div className="bola-barra"></div> <span className="traco-barra"></span></div>
                    <div>
                        <p>Rua das figuerias, 150</p>
                        <span>Jardim Bela vista</span>
                    </div>
                </div>
                <div className="container-item-percurso container-item-off">
                    <p>16:58</p>
                    <div className="container-barra">
                        <div className="bola-barra"></div>
                        <span className="traco-barra"></span>
                    </div>
                    <div>
                        <p>Avenida Portugal, 1010</p>
                        <span>Centro, Santo André - SP, 09040-001</span>
                        <button>Confirmar embarque</button>
                    </div>
                </div>
                <div className="container-item-percurso container-item-off item-final">
                    <p>16:58</p>
                    <div className="container-barra">
                        <div className="bola-barra"></div>
                        <span className="traco-barra"></span>
                    </div>
                    <div>
                        <p>Universidade Municipal de São Caetano do Sul - Campus Conceição</p>
                        <span>R. Conceição, 321 - Santo Antônio, São Caetano do Sul - SP, 09530-060</span>
                    </div>
                </div>

            </div>

            <FooterDriver percurso />
        </div >
    )
}