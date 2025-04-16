export const handleImageCloudifary = async (image) => {
  const ASSETS_CLOUDIFARY = import.meta.env.VITE_ASSETS_CLOUD;
  const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "unsigned_preset"); // Nome do preset que você criou
  
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${ASSETS_CLOUDIFARY}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  const data = await response.json();
  return data
}