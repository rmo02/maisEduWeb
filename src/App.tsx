import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./pages/home"
import { Navbar } from "./components/navbar"
import { Dashboard } from "./pages/dashboard"
import { Chat } from "./pages/chat"
import { Disciplinas } from "./pages/dissciplinas"
import { Progresso } from "./pages/progresso"
import {AulaVideo} from "./pages/aulaVideo"

export function App() {
  return (
   <BrowserRouter>
   <Navbar />
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/disciplinas" element={<Disciplinas />}/>
      <Route path="/progresso" element={<Progresso />}/>
      <Route path="/chat" element={<Chat />}/>
      <Route path="/aula" element={<AulaVideo />}/>
    </Routes>
   </BrowserRouter>
  )
}
