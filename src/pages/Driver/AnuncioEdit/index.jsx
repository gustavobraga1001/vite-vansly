import { useNavigate } from "react-router-dom"
import HeaderFixo from "../../../components/HeaderFixo/headerFixo"
import { useEffect, useRef, useState } from "react"

import "./styles.css"
import useAuth from "../../../contexts/AuthProvider/useAuth"
import { useQuery } from "react-query"
import Loading from "../../../components/Loading"
import Api from "../../../contexts/AuthProvider/services/api"
import { CloudArrowUp, PlusSquare, UploadSimple } from "@phosphor-icons/react"

export function AnuncioEdit() {
  const [formValues, setFormValues] = useState({
    regiao: "",
    instituicao: "",
    valor: "",
    images: "",
  })

  const [photos, setPhotos] = useState([]);
  
  
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

  const hasFetchedAnnouncement = useRef(false)

useEffect(() => {
  const fetchAnnouncement = async () => {
    try {
      const response = await Api.get(`get-announcement-driver/${user.driver_id}`)
      const announcement = response.data.announcement

      if (announcement) {
        setFormValues({
          regiao: announcement.city || "",
          valor: formatCurrency(String(announcement.monthlyAmount * 100 || "0")),
          images: announcement.images.map(image => image.url).join(', ')
        })
        setPhotos(announcement.images.map(image => image.url))
        setAnnouncementId(announcement.id)
      }
    } catch (error) {
      console.error("Erro ao buscar anúncio:", error)
    }
  }

  if (user?.driver_id && !hasFetchedAnnouncement.current) {
    fetchAnnouncement()
    hasFetchedAnnouncement.current = true
  }
}, [user?.driver_id])

  
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
        console.log(anuncio)
        await Api.patch(`edit-announcement`, anuncio)
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

  const handleImageChange = async (e) => {

    const ASSETS_CLOUDIFARY = import.meta.env.VITE_ASSETS_CLOUD;
    console.log('cloud:', ASSETS_CLOUDIFARY);
    const file = e.target.files[0];
    const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "unsigned_preset"); // Nome do preset que você criou
        
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${ASSETS_CLOUDIFARY}/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
    const data = await response.json();
    setPhotos((prev) => [...prev, data.secure_url]);
  };

  console.log(photos)

  const handleRemovePhoto = async (indexToRemove) => {
    photos[indexToRemove];
    
    try {
        const updatedPhotos = photos.filter((_, index) => index !== indexToRemove);
        setPhotos(updatedPhotos);
  
        // Atualiza o campo `images` para manter a string com as URLs atualizadas
        setFormValues((prev) => ({
          ...prev,
          images: updatedPhotos.join(", "),
        }));
    } catch (error) {
      console.error("Erro ao excluir imagem do Cloudinary:", error);
    }
  };

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

        {formValues.images.length === 0 && (

        <div>
          <label htmlFor="images">Imagens do anúncio</label>
          <section className="box-upload-first" onClick={() => document.getElementById("imageInput").click()}>
            <CloudArrowUp size={24} color="rgba(0, 59, 109, 1)"/>
            <p>Faça o upload das fotos do veículo para o anúncio</p>
            <PlusSquare size={32} color="rgba(0, 59, 109, 1)" weight="fill"/>
            <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }} // Esconde o input de arquivo
            />
          </section>
        </div>
        )}

        
        <div>
          <p>Imagens do anúncio</p>
          <section className="box-array-images">
            {photos.map((photo, index) => (
              <span key={index}>
                <img src={photo} alt={`Foto ${index + 1}`} style={{width: "50px", borderRadius: "8px", height: "50px"}} />
                <div className="dot-red" onClick={() => handleRemovePhoto(index)}>
                  <div className="dash"></div>
                </div>
              </span>
            ))}
          </section>
          {photos.length > 0 && (

          <section className="button-submit-image" onClick={() => document.getElementById("imageInput").click()}>
            <p>Enviar Imagem</p>
            <UploadSimple size={18} color="#ffffff"/>
            <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }} // Esconde o input de arquivo
            />
          </section>
          )}
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
