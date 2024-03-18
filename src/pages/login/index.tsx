import api from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import Logo from "../../assets/logo/Logo.png";
import backgroundImgNew from "../../assets/logo/background.png";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const { setToken, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  async function postLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await api.post("escolas/users/login", {
        mat: matricula,
        password: senha,
      });
      if (res.status == 200) {
        setToken(res.data.token);
        setUser(res.data.user);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img
          className="w-full h-screen object-cover"
          src={backgroundImgNew}
          alt="background image"
        />
      </div>
      <div className="w-full h-screen bg-loginBackground bg-cover bg-no-repeat flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-[#4263EB] rounded-md p-8"
          onSubmit={postLogin}
        >
          <a className="w-full flex justify-center items-center my-2">
            <img src={Logo} className="px-10" />
          </a>
          <div className="flex flex-col py-1">
            <label htmlFor="mat" className="text-zinc-200">
              Matrícula
            </label>
            <input
              className="border p-2 rounded outline-none text-zinc-700"
              id="mat"
              type="text"
              name="mat"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password" className="text-zinc-200">
              Senha
            </label>
            <input
              className="border p-2 rounded outline-none text-zinc-700"
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="flex justify-start items-center">
            <p className="text-white">
              <input className="rounded-md" type="checkbox" /> Manter conectado
            </p>
          </div>
          <button className="bg-[#18C4B3] w-full my-2 py-2 rounded-md text-white hover:bg-[#16b1a1] duration-300">
            Entrar
          </button>
          <div className="flex justify-between mb-10">
            <p></p>
            <p className="text-white text-sm">
              <a href="#">Esqueci minha senha.</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
