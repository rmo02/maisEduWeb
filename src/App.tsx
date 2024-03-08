import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./pages/home"
import { Navbar } from "./components/navbar"
import { Chat } from "./pages/chat"
import { Disciplinas } from "./pages/dissciplinas"
import { Progresso } from "./pages/progresso"
import { Conteudos } from "./pages/conteudos"

export function App() {
  return (
   <BrowserRouter>
   <Navbar />
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/disciplinas" element={<Disciplinas />}/>
      <Route path="/disciplinas/matematica" element={<Conteudos />}/>
      <Route path="/progresso" element={<Progresso />}/>
      <Route path="/chat" element={<Chat />}/>
    </Routes>
   </BrowserRouter>
  )
}
