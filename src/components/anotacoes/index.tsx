import { useContext, useEffect, useState } from "react";
import api from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { NotaDTO } from "@/DTO/NotaDTO";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Anotacoes() {
  const { user } = useContext(AuthContext);
  const [descricao, setDescricao] = useState("");
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);
  const [descricaoEditada, setDescricaoEditada] = useState("");
  const [notas, setNotas] = useState<NotaDTO[]>([]);

  const notify = (text: string, type: string) => {
    switch (type) {
      case "success":
        toast.success(text, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case "info":
        toast.info(text, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case "error":
        toast.error(text, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      default:
        toast(text); // Para o caso padrão, apenas exiba uma notificação padrão
        break;
    }
  };

  const getAnotacoes = async () => {
    try {
      const res = await api.get(`/anotacoesByAluno/${user?.id}`);
      setNotas(res.data["anotacoes"]);
    } catch (error) {
      setNotas([]);
      throw error;
    }
  };

  const criarNota = async (descricao: string) => {
    if (descricao.length > 0) {
      try {
        const res = await api.post(`/anotacoes`, {
          descricao: descricao,
          id_aluno: `${user?.id}`,
          array_tags: "tags",
        });
        if (res.status === 201) {
          getAnotacoes();
          setDescricao("");
          notify("Anotação criada!", "success");
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const editarNota = async (id: string, novaDescricao: string) => {
    if (novaDescricao.length > 0) {
      try {
        const res = await api.put(`/anotacoes/${id}`, {
          descricao: novaDescricao,
          id_aluno: `${user?.id}`,
          array_tags: "tags",
        });
        if (res.status === 200) {
          getAnotacoes();
          setEditandoIndex(null);
        }
        notify("Anotação editada!", "info");
      } catch (error) {
        throw error;
      }
    }
  };

  const cancelarEdicao = (index: number) => {
    setDescricaoEditada("");
    setEditandoIndex(null);

    // Armazenar temporariamente a descrição original

    const descricaoOriginalTemp = notas[index].descricao;
    // Restaurar a descrição original
    const notasAtualizadas = notas.map((item, idx) => {
      if (idx === index) {
        return { ...item, descricao: descricaoOriginalTemp };
      }
      return item;
    });
    setNotas(notasAtualizadas);
  };

  // deletando as anotações
  const delAnotacoes = async (id: string) => {
    try {
      const res = await api.delete(`/anotacoes/${id}`);
      if (res.status === 204) {
        getAnotacoes();
      }
      notify("Anotação apagada!", "error"); // Chamada para notificação de sucesso
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAnotacoes();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <textarea
          required
          placeholder="Escreva sua nova anotação aqui"
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
          }}
          className="w-full h-24 placeholder-blue-600 placeholder:text-sm text-base rounded-lg outline-none p-2 scrollbar-thin resize-none"
        />
        <div className="w-full flex items-center justify-center mt-2">
          <Button
            className={`w-full h-[6vh] rounded-lg bg-blue-600 shadow-2xl hover:opacity-70 text-white ${
              descricao.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            variant={null}
            onClick={() => criarNota(descricao)}
          >
            Salvar
          </Button>
          <ToastContainer />
        </div>
      </div>
      <section className="w-full h-[60vh] mt-3">
        <div className="h-full flex overflow-y-auto scrollbar-thin scrollbar-thumb">
          <ol className=" w-full flex flex-col">
            {notas.length > 0 &&
              notas.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex flex-col items-center justify-center mt-3 relative"
                  >
                    <textarea
                      required
                      value={
                        editandoIndex === index
                          ? descricaoEditada
                          : item.descricao
                      }
                      placeholder="Escreva sua anotação aqui"
                      onChange={(e) => {
                        setDescricaoEditada(e.target.value);
                        setEditandoIndex(index);
                      }}
                      className="w-full h-24 placeholder-blue-600 placeholder:text-sm text-base rounded-lg outline-none p-2 pr-6 scrollbar-thin resize-none"
                    />

                    <Button
                      className="absolute top-0 right-0 w-[1rem] h-[2rem] rounded-lg text-azul_claro_2 hover:opacity-50 text-2xl font-semibold"
                      variant={null}
                      onClick={() => delAnotacoes(item.id)} // Salva a edição apenas quando o botão é clicado
                    >
                      X
                    </Button>

                    {/* Ao clicar em uma nota já criada, o index dela é salvo na variável editandoIndex */}
                    {editandoIndex === index && ( // Renderiza o botão apenas se estiver editando esta nota
                      <div className="w-full flex flex-row justify-around mt-2 h-[6vh]">
                        <Button
                          className="w-2/5 h-full flex items-center justify-center rounded-lg bg-popover shadow-lg hover:opacity-70 text-sm hover:text-black font-semibold"
                          variant={null}
                          onClick={() => cancelarEdicao(index)}
                        >
                          Cancelar edição
                        </Button>
                        <Button
                          className={`w-2/5 h-full flex items-center justify-center rounded-lg bg-blue-600 shadow-2xl hover:opacity-70 text-sm text-white ${
                            descricaoEditada.length === 0
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          variant={null}
                          onClick={() => editarNota(item.id, descricaoEditada)} // Salva a edição apenas quando o botão é clicado
                        >
                          Salvar
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
          </ol>
        </div>
      </section>
    </div>
  );
}
