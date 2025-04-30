import { useQuery } from "react-query";
import HeaderFixo from "../../../../components/HeaderFixo/headerFixo";
import Api from "../../../../contexts/AuthProvider/services/api";
import Loading from "../../../../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { dateFormatter, priceFormatter } from "../../../../utils/formtter";
import TimerSuccess from '../../../../assets/timer-success.svg';


const Payment = () => { 
    const { user_id, mouth } = useParams(); // Obtém o parâmetro "id" da URL
    const navigate = useNavigate();
  
    // Consulta para obter contratos com base no mês selecionado
    const { data: contratos, isLoading } = useQuery(
      ["payments", mouth], // Dependência para refazer a query quando o mês mudar
      () => Api.get(`get-payments/${mouth}`)
    );
    
    if (isLoading || !contratos) {
      return <Loading />;
    }
    const contrato = contratos.data.filter((contract) => contract.user_id === user_id);
    const payment = contrato[0].payment[0];

    async function handleCancelPayment() {
      Api.post("cancel-payment", { paymentId: payment.id })
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      navigate("/estatisticas");
    }

    console.log(contrato);

    return (
            <div>
              <HeaderFixo tela={"estatisticas"} text={"Confirmação de Pagamento"} />
              <div className="box-timer-payment">
                <img src={TimerSuccess} alt="" />
                <h2>Pagamento confirmado</h2>
              </div>
              <div className="card-user-payment">
                <p>{contrato[0].name}</p>
              </div>
              <div className="card-payment-infos">
                <div className="card-payment-infos-line">
                  <p>Valor</p>
                  <p>{priceFormatter.format(Number(payment.value))}</p>
                </div>
                <div className="card-payment-infos-line">
                  <p>Data Vencimento</p>
                  <p>{dateFormatter.format(new Date(contrato[0].venciment))}</p>
                </div>
                <div className="card-payment-infos-line">
                  <p>Data do pagamento</p>
                  <p>{dateFormatter.format(new Date(payment.payment_at))}</p>
                </div>
                <div className="card-payment-infos-line">
                  <p>Status</p>
                  <p>Pendente</p>
                </div>
    
              </div>
                <button className="button-payment button-cancel-payment" onClick={handleCancelPayment}>
                Cancelar Confirmação de Pagamento
                </button>
            </div>
        );
}

export default Payment;