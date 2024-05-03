import { VideoAulaDTO } from "@/DTO/AulaDTO";
import { FavoritoDTO } from "@/DTO/FavoritoDTO";
import api from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import ReactPlayer from "react-player";

export function VideoPlayer({ VideoAula }: { VideoAula: VideoAulaDTO }) {
  const { user } = useContext(AuthContext);

  const [favoritos, setFavoritos] = useState<FavoritoDTO[]>([]);
  const [fav, setFav] = useState(false);

  const getAulasFavoritadas = async () => {
    try {
      const res = await api.get(`/favoritos/${user?.id}`);
      setFavoritos(res.data["favoritos"]);
      console.log(favoritos);
    } catch (error) {
      console.log(error);
    }
  };


  //função de favoritar de desfavoritar video
  const handleFavoritar = async (idAula: string) => {
    try {
      const response = await api.post(`/favoritos/${user?.id}`, {
        id_aula: idAula,
      });
      if (response.status === 201) {
        setFav(true);
        getAulasFavoritadas();
        console.log("FAV: TRUE ->", favoritos);
      }
      if (response.status === 204) {
        setFav(false);
        getAulasFavoritadas();
        console.log("FAV: FALSE ->", favoritos);
      }
    } catch (error) {
      console.log("Deu erro");
    }
  };

  return (
    <div className="border-2 border-solid border-blue-600 object-cover relative">
      <ReactPlayer
        width="100%"
        height="100%"
        controls={true}
        playing
        loop
        url={VideoAula?.file}
      />
      <button
        className="w-1/6 absolute top-4 right-4 flex flex-row items-center justify-evenly bg-white text-cinza_escuro border-2 border-solid border-blue-600 py-1 rounded-3xl"
        onClick={() => handleFavoritar(VideoAula?.id)}
      >
        <div className="text-blue-600 text-xl font-bold">
          {favoritos.some((item) => item?.id_aula === VideoAula?.id) || fav ? (
            <MdOutlineStar />
          ) : (
            <MdOutlineStarBorder />
          )}
        </div>
        <h1 className="text-sm font-bold">Favoritar</h1>
      </button>
    </div>
  );
}
