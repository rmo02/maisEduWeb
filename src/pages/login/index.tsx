import api from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react"

export function Login() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const { setToken, setUser } = useContext(AuthContext);

    const postLogin = async() => {
        try {
            const res = await api.post('escolas/users/login', {
                mat: matricula,
                password: senha
            })
            setToken(res.data.token);
            setUser(res.data.user);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    return (
        <div>
            <h2>Login</h2>
        </div>
    )
}