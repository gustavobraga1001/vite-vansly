import { useState } from 'react';

const CLIENT_ID = 'e03bc1a3640f912'; // Substitua pelo seu Client ID do Imgur

export default function ImgurUploader() {
  const [image, setImage] = useState(null);
  const [imgurUrl, setImgurUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const uploadToImgur = async () => {
    if (!image) return alert('Selecione uma imagem primeiro!');
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('type', 'image'); // Tipo da imagem
    formData.append('title', 'Simple upload'); // Título da imagem
    formData.append('description', 'This is a simple image upload in Imgur'); // Descrição

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Client-ID ${CLIENT_ID}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    try {
      const response = await fetch('https://api.imgur.com/3/image', requestOptions);

      // Adicionando log para ver a resposta
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Verificando o conteúdo da resposta
      console.log('Imagem enviada com sucesso:', data);

      if (data.success) {
        setImgurUrl(data.data.link); // URL da imagem carregada no Imgur
      } else {
        alert('Falha ao enviar imagem para o Imgur');
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      alert('Erro ao enviar imagem: ' + error.message); // Exibe o erro detalhado
      // Se o erro for um erro de rede, vamos tentar pegar mais detalhes
      if (error.response) {
        console.error('Detalhes da resposta:', error.response);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro geral:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-sm mx-auto text-center">
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={uploadToImgur}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar para Imgur'}
      </button>
      {imgurUrl && (
        <div className="mt-4">
          <p>Imagem enviada:</p>
          <img src={imgurUrl} alt="Imagem enviada" className="w-full rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
}
