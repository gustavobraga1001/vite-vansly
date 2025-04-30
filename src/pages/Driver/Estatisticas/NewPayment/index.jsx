import { useNavigate, useParams } from "react-router-dom";
import HeaderFixo from "../../../../components/HeaderFixo/headerFixo";
import Api from "../../../../contexts/AuthProvider/services/api";
import { useQuery } from "react-query";
import Loading from "../../../../components/Loading";
import TimerPending from '../../../../assets/timer-pending.svg';
import "./styles.css";
import { dateFormatter, priceFormatter } from "../../../../utils/formtter";

const NewPayment = () => { 
  const { user_id, mouth } = useParams(); // Obtém o parâmetro "id" da URL
  const navigate = useNavigate();

  async function getContract() {
      try {
        const response = await Api.get(`/get-contracts-driver/ACEITO`); // Passa o parâmetro diretamente na URL
        return response.data;
      } catch (error) {
        console.log(error.response.status);
      }
    }
  
    const { data, isLoading } = useQuery(["contracts"], getContract, {
      staleTime: 20000,
    });

    const contracts = data?.contracts;

    const userContract = contracts?.filter((contract) => contract.user.id === user_id);

    console.log(userContract);
    
    if (isLoading) {
        return <Loading />;
    }

    function handlePaymentUser() {
        const payment = Api.post("register-payment", {
           contractId: userContract[0].id,
            mouth: mouth,
            value: Number(userContract[0].monthlyAmount)
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        console.log(payment);
        navigate("/estatisticas");
    }

  console.log(mouth, user_id);
    return (
        <div>
          <HeaderFixo tela={"estatisticas"} text={"Confirmação de Pagamento"} />
          <div className="box-timer-payment">
            <img src={TimerPending} alt="" />
            <h2>Aguardando sua confirmação</h2>
          </div>
          <div className="card-user-payment">
            <p>{userContract[0].user.name}</p>
          </div>
          <div className="card-payment-infos">
            <div className="card-payment-infos-line">
              <p>Valor</p>
              <p>{priceFormatter.format(userContract[0].monthlyAmount)}</p>
            </div>
            <div className="card-payment-infos-line">
              <p>Data Vencimento</p>
              <p>{dateFormatter.format(new Date(userContract[0].created_at))}</p>
            </div>
            <div className="card-payment-infos-line">
              <p>Data do pagamento</p>
              <p>Ainda não foi pago</p>
            </div>
            <div className="card-payment-infos-line">
              <p>Status</p>
              <p>Pendente</p>
            </div>

          </div>
            <button className="button-payment button-new-payment" onClick={handlePaymentUser}>
            Marcar como Pago
            </button>
        </div>
    );
}

export default NewPayment;