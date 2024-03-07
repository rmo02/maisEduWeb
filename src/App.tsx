import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./pages/home"
import { Navbar } from "./components/navbar"
import { Dashboard } from "./pages/dashboard"
import { Chat } from "./pages/chat"
import { Turmas } from "./pages/turmas"
import { Progresso } from "./pages/progresso"
import {AulaVideo} from "./pages/aulaVideo"

export function App() {
  return (
   <BrowserRouter>
   <Navbar />
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/turmas" element={<Turmas />}/>
      <Route path="/progresso" element={<Progresso />}/>
      <Route path="/chat" element={<Chat />}/>
      <Route path="/aula" element={<AulaVideo />}/>
    </Routes>
   </BrowserRouter>
  )
}
