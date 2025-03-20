import { useNavigate } from "react-router-dom"
import HeaderFixo from "../../../components/HeaderFixo/headerFixo"
import { useState, useEffect } from "react"

import "./styles.css"
import useAuth from "../../../contexts/AuthProvider/useAuth"
import { useQuery } from "react-query"
import Loading from "../../../components/Loading"
import Api from "../../../contexts/AuthProvider/services/api"

export function AnuncioEdit() {
  const [formValues, setFormValues] = useState({
    regiao: "",
    instituicao: "",
    valor: "",
    images: "",
  })
  
  const [announcementId, setAnnouncementId] = useState(null)
  
  const navigate = useNavigate()
  const auth = useAuth()

  const { data, isLoading } = useQuery(["user"], () => auth.getUser())
  const user = data?.user || {}

  const { data: vehicleData } = useQuery(
    ["vehicle"],
    () => user?.driver_id ? Api.get(`get-vehicle/${user.driver_id}`) : Promise.resolve(),
    {
      enabled: !!user?.driver_id
    }
  )

  const vehicle = vehicleData?.data?.vehicle

  // Busca o anúncio existente, se houver
  const { data: announcementData } = useQuery(
    ["announcement", user?.driver_id],
    () => user?.driver_id ? Api.get(`get-announcement-driver/${user.driver_id}`) : Promise.resolve(),
    {
      enabled: !!user?.driver_id,
      retry: false, // Não tenta novamente automaticamente
      onSuccess: (data) => {
        const announcement = data.data.announcement
        if (data?.data.announcement) {
          setFormValues({
            regiao: announcement.city || "",
            valor: formatCurrency(String(announcement.monthlyAmount * 100 || "0")),
            images: announcement.images?.join(", ") || "",
          })
          setAnnouncementId(announcement.id)
        }
      },
    }
  )
  
  const formatCurrency = (value) => {
    const valueOnlyDigits = value.replace(/\D/g, "")
    const formattedValue = (Number(valueOnlyDigits) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    return formattedValue
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleValueChange = (e) => {
    const formattedValue = formatCurrency(e.target.value)
    setFormValues({
      ...formValues,
      valor: formattedValue,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const anuncio = {
      title: `Van do ${user.name}`,
      stars: 0,
      city: formValues.regiao,
      monthlyAmount: Number(formValues.valor.replace(/[^\d,]/g, "").replace(",", ".")),
      imagesUrl: formValues.images.split(",").map((image) => image.trim()),
      driverId: user.driver_id,
      vehicleId: vehicle?.id
    }

    try {
      if (announcementId) {
        // Se já existe um anúncio, faz PATCH
        await Api.patch(`edit-announcement/${announcementId}`, anuncio)
      } else {
        // Se não existe anúncio, faz POST
        await Api.post("announcements", anuncio)
      }
      navigate("/perfil")
    } catch (error) {
      console.error("Erro ao salvar o anúncio:", error)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="anuncio-edit-container">
      <HeaderFixo text={"Edição de anúncio"} tela={"perfil"} />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="regiao">Regiões de atendimento</label>
          <select
            id="regiao"
            name="regiao"
            value={formValues.regiao}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Cidade
            </option>
            <option value="Cidade1">Cidade 1</option>
            <option value="Cidade2">Cidade 2</option>
            <option value="Cidade3">Cidade 3</option>
          </select>
        </div>

        <div>
          <label htmlFor="instituicao">Instituições de atendimento</label>
          <select
            id="instituicao"
            name="instituicao"
            value={formValues.instituicao}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Nome da instituição
            </option>
            <option value="instituicao1">Instituição 1</option>
            <option value="instituicao2">Instituição 2</option>
            <option value="instituicao3">Instituição 3</option>
          </select>
        </div>

        <div>
          <label htmlFor="valor">Preço mensal do serviço</label>
          <input
            type="text"
            id="valor"
            name="valor"
            placeholder="R$ 0,00"
            value={formValues.valor}
            onChange={handleValueChange}
            required
          />
        </div>

        <div>
          <label htmlFor="images">Url imagens</label>
          <textarea
            name="images"
            id="images"
            placeholder="Imagens..."
            value={formValues.images}
            onChange={handleInputChange}
          />
        </div>

        <div className="box-fix-button">
          <input type="submit" value="Salvar" />
        </div>
      </form>
    </div>
  )
}
