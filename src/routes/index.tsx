import { Navbar } from "@/components/navbar";
import { VideoPlayer } from "@/components/videoPlayer";
import { AuthContext } from "@/context/AuthContext";
import { Aulas } from "@/pages/aulas";
import { Chat } from "@/pages/chat";
import { Assunto } from "@/pages/assunto";
import { Disciplinas } from "@/pages/disciplinas";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Progresso } from "@/pages/progresso";
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Conteudo } from "@/pages/conteudo";

function RotasProtegidas() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/disciplinas/:idDisc/assunto/" element={<Assunto />} />
        <Route
          path="/disciplinas/:idDisc/assunto/:idAssunto/conteudo"
          element={<Conteudo />}
        />
        <Route
          path="/disciplinas/:idDisc/assunto/:idAssunto/conteudo/:idConteudo/aula/:numIndex"
          element={<Aulas />}
        />
        <Route path="/progresso" element={<Progresso />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/video" element={<VideoPlayer />} />
      </Routes>
    </>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<RotasProtegidas />} />
      </Routes>
    </BrowserRouter>
  );
}
