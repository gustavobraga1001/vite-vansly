import { useNavigate } from "react-router-dom"
import HeaderFixo from "../../../components/HeaderFixo/headerFixo"
import { useContext, useEffect, useState } from "react"
import "./styles.css"
import useAuth from "../../../contexts/AuthProvider/useAuth"
import { useQuery } from "react-query"
import Loading from "../../../components/Loading"
import Api from "../../../contexts/AuthProvider/services/api"
import { CloudArrowUp, PlusSquare, UploadSimple } from "@phosphor-icons/react"
import { AnnouncementContext } from "../../../contexts/AnnouncementProvider/AnnouncementContext"
import { priceFormatter } from "../../../utils/formtter"
import { ImagesAnnouncement } from "./components/ImagesAnnouncement"
import { handleImageCloudifary } from "../../../utils/cloudifary"

export function AnuncioEdit() {
  const [announcementId, setAnnouncementId] = useState(null)
  const [priceFormatted, setPriceFormatter] = useState("");
  const [city, setCity] = useState("");
  // const [institution, setInstitution] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [imagesAnnouncement, setImagesAnnouncement] = useState([]);
  
  const navigate = useNavigate()
  const auth = useAuth()

  const { data, isLoading } = useQuery(["user"], () => auth.getUser())
  const user = data?.user || {}

  const { loadAnnouncementDriver, announcementDriver } = useContext(AnnouncementContext)

  useEffect(() => {
    if (user?.driver_id) {
      loadAnnouncementDriver(user.driver_id);
    }
  }, [user.driver_id]); // só chama quando driver_id estiver definido

  useEffect(() => {
    if (announcementDriver) {
      // setInstitution(announcementDriver.institution || "");
      setCity(announcementDriver.city || "");
      setImagesAnnouncement(announcementDriver.images?.map(image => image) || []);
      setAnnouncementId(announcementDriver.id || null);
      setMonthlyAmount(announcementDriver.monthlyAmount || 0);
      setPriceFormatter(priceFormatter.format(announcementDriver.monthlyAmount || 0));
    }
  }, [announcementDriver]);
  
  
  const { data: vehicleData } = useQuery(
    ["vehicle"],
    () => user?.driver_id ? Api.get(`get-vehicle/${user.driver_id}`) : Promise.resolve(),
    {
      enabled: !!user?.driver_id
    }
  )

  const vehicle = vehicleData?.data?.vehicle

  // Atualiza valor numérico e string formatada
  const handleValueChange = (e) => {
    const raw = e.target.value;

    // Remove tudo que não for número
    const numberOnly = raw.replace(/\D/g, "");

    // Divide por 100 pra simular centavos
    const numericValue = Number(numberOnly) / 100;

    setMonthlyAmount(numericValue);

    // Atualiza campo formatado
    setPriceFormatter(priceFormatter.format(numericValue));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const announcement = {
      title: `Van do ${user.name}`,
      stars: 0,
      city,
      monthlyAmount,
      imagesUrl: imagesAnnouncement.map(img => img.url),
      driverId: user.driver_id,
      vehicleId: vehicle?.id
    }

    try {
      if (announcementId) {
        // Se já existe um anúncio, faz PATCH
        await Api.patch(`edit-announcement`, announcement)
      } else {
        // Se não existe anúncio, faz POST
        await Api.post("announcements", announcement)
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
    const file = e.target.files[0];
    const response = await handleImageCloudifary(file)
    console.log(response)

    setImagesAnnouncement((prev) => [...prev, response.secure_url]);
  };

  const handleRemovePhoto = async (imageId) => {
    try {
        const updatedPhotos = imagesAnnouncement.filter((image) => image.id !== imageId);
        setImagesAnnouncement(updatedPhotos);
  
        // Atualiza o campo `images` para manter a string com as URLs atualizadas
        setImagesAnnouncement((updatedPhotos));
    } catch (error) {
      console.error("Erro ao excluir imagem do Cloudinary:", error);
    }
  };

  return (
    <div className="anuncio-edit-container">
      <HeaderFixo text={"Edição de anúncio"} tela={"perfil"} />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">Regiões de atendimento</label>
          <input 
            type="text" 
            name="city" 
            id="city" 
            value={city}
            onChange={(e) => setCity(e.targer.value)}
            required
          />
        </div>

        {/* <div>
          <label htmlFor="institution">Instituições de atendimento</label>
          <input 
            type="text" 
            name="institution" 
            id="institution" 
            value={institution}
            onChange={(e) => setInstitution(e.targer.value)}
            required
          />
        </div> */}

        <div>
          <label htmlFor="mountyAmount">Preço mensal do serviço</label>
          <input
            type="text"
            id="mountyAmount"
            name="mountyAmount"
            placeholder="R$ 0,00"
            value={priceFormatted}
            onChange={handleValueChange}
            required
          />
        </div>

        <ImagesAnnouncement 
          imagesAnnouncement={imagesAnnouncement} 
          onChangeImage={handleImageChange}
          handleRemovePhoto={handleRemovePhoto}
        />

        <div className="box-fix-button">
          <input type="submit" value="Salvar" />
        </div>
      </form>
    </div>
  )
}