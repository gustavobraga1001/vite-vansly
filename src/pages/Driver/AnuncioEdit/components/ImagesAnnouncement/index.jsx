import { CloudArrowUp, PlusSquare, UploadSimple } from "@phosphor-icons/react"

// eslint-disable-next-line react/prop-types
export const ImagesAnnouncement = ({ imagesAnnouncement, handleImageChange, handleRemovePhoto }) => {
  console.log("imagesAnnouncement", imagesAnnouncement);
  return (
    <>
      {imagesAnnouncement.length === 0 && (
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
            {imagesAnnouncement.map((image, index) => (
              <span key={image.id}>
                <img src={image.url} alt={`Foto ${index + 1}`} style={{width: "50px", borderRadius: "8px", height: "50px"}} />
                <div className="dot-red" onClick={() => handleRemovePhoto(image.id)}>
                  <div className="dash"></div>
                </div>
              </span>
            ))}
          </section>
          {imagesAnnouncement.length > 0 && (
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
    </>
  )
}