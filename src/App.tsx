import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./pages/home"
import { Navbar } from "./components/navbar"
import { Chat } from "./pages/chat"
import { Disciplinas } from "./pages/dissciplinas"
import { Progresso } from "./pages/progresso"
import { Conteudos } from "./pages/conteudos"
import { Aulas } from "./pages/aulas"
import { VideoPlayer } from "./components/videoPlayer"

export function App() {
  return (
   <BrowserRouter>
   <Navbar />
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/disciplinas" element={<Disciplinas />}/>
      <Route path="/disciplinas/matematica" element={<Conteudos />}/>
      <Route path="/disciplinas/matematica/aula/1" element={<Aulas />}/>
      <Route path="/progresso" element={<Progresso />}/>
      <Route path="/chat" element={<Chat />}/>
      <Route path="/video" element={<VideoPlayer />}/>

    </Routes>
   </BrowserRouter>
  )
}
