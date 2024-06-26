import { Questoes } from "@/DTO/QuestoesDTO";
import api from "@/api";
import { useEffect, useState } from "react";

export function Atividade({ id }: { id: string | undefined }) {
  const [questoes, setQuestoes] = useState<Questoes[] | null>(); //Questões
  const [currentQuestion, setCurrentQuestion] = useState(0); //Questão atual
  const [showScore, setShowScore] = useState(false); // Controla se a pontuação deve ser exibida
  const [score, setScore] = useState(0); // Contador da pontuação
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(
    null
  );
  const [progressWidth, setProgressWidth] = useState(0);

  // Função para obter as questões da API com base no ID da atividade
  const getAtividade = async () => {
    try {
      const res = await api.get(`/atividadeQuestoes/${id}/`);
      setQuestoes(res.data["questoes"]);
    } catch (error) {
      console.log(error);
    }
  };

  // Efeito que é executado quando o ID da atividade é alterado
  useEffect(() => {
    // Reseta todos os estados relacionados à atividade quando o ID da atividade é alterado
    setQuestoes(null);
    setShowScore(false);
    setScore(0);
    setRespostaSelecionada(null);
    setCurrentQuestion(0);
    // Verifica se o ID da atividade é válido e, se for, obtém as questões da atividade
    if (id) {
      getAtividade();
    }
  }, [id]);

  // Efeito para "contar" o tamanho da barra de progresso
  useEffect(() => {
    if (questoes) {
      const width = ((currentQuestion + 1) / questoes?.length) * 100;
      setProgressWidth(width);
    }
  }, [currentQuestion, questoes]);

  // Função para lidar com a seleção de uma opção de resposta
  const handleAnswerOptions = (index: number) => {
    // Verifica se uma resposta já foi selecionada
    if (respostaSelecionada === null) {
      // Armazena o índice da resposta selecionada
      setRespostaSelecionada(index);
      // Verifica se a resposta selecionada está correta e atualiza a pontuação
      if (
        questoes &&
        questoes[currentQuestion]?.opcoes[index] ===
          questoes?.[currentQuestion].correct_option
      ) {
        setScore(score + 1);
      }
    }
  };

  // Função para verificar se uma resposta é correta com base no índice da opção
  const isRespostaCorreta = (index: number) => {
    return (
      respostaSelecionada !== null &&
      index === respostaSelecionada &&
      questoes &&
      questoes[currentQuestion]?.opcoes &&
      questoes[currentQuestion].opcoes[index] ===
        questoes?.[currentQuestion].correct_option
    );
  };

  // Função para avançar para a próxima questão
  const handleNextQuestion = () => {
    // Verifica se alguma resposta foi selecionada
    if (respostaSelecionada !== null) {
      // Calcula o número da próxima questão
      const numberQuestion = currentQuestion + 1;
      // Reseta a resposta selecionada para null
      setRespostaSelecionada(null);
      // Verifica se ainda há mais questões a serem exibidas
      if (questoes && numberQuestion < questoes?.length) {
        // Se houver, atualiza o estado para mostrar a próxima questão
        setCurrentQuestion(numberQuestion);
      } else {
        // Se não houver mais questões, exibe a pontuação final
        setShowScore(true);
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      {showScore ? (
        // Se showScore for verdadeiro, exibe a pontuação final
        <div className="w-1/2 h-1/2 flex flex-col items-center justify-evenly bg-blue-600 rounded-xl p-4">
          <div className="w-full bg-azul_claro_2 rounded-xl p-6 font-bold text-lg text-center text-foreground">
            Você acertou {score} de {questoes?.length}!
          </div>
          <div
            className="w-full bg-background hover:bg-blue-200 rounded-xl shadow-md  p-3 font-medium text-lg text-center text-foreground cursor-pointer"
            onClick={() => {
              window.location.reload();
            }}
          >
            Jogar de novo
          </div>
        </div>
      ) : (
        // Se showScore for falso, exibe a próxima questão
        <div className="w-full h-full flex flex-col bg-blue-600 rounded-xl p-4 gap-4">
          <div
            className={`w-full bg-azul_muito_muito_claro rounded-full h-1.5`}
          >
            <div
              style={{ width: `${progressWidth}%` }}
              className={`bg-green-500 h-1.5 rounded-full`}
            ></div>
          </div>
          <div className="font-bold text-lg text-justify text-background">
            Questão {currentQuestion + 1} de {questoes?.length}
          </div>
          <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full bg-azul_claro_2 rounded-xl p-5 font-bold text-lg text-justify text-foreground">
              {questoes?.[currentQuestion]?.title}
            </div>
            <div className="w-full flex flex-col items-center gap-4">
              {questoes &&
                questoes[currentQuestion]?.opcoes &&
                questoes[currentQuestion].opcoes.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`w-full bg-background hover:bg-blue-200 shadow-md rounded-xl p-3 font-medium text-lg text-foreground cursor-pointer ${
                        respostaSelecionada !== null
                          ? isRespostaCorreta(index)
                            ? "border-green-600 border-2 bg-green-400 shadow-md hover:bg-green-400" //Se a resposta está correta, altera para a estilização para verde
                            : index === respostaSelecionada
                            ? "border-red-600 border-2 bg-red-400 shadow-md hover:bg-red-400" //Se a resposta está errada, altera para a estilização para vermelho
                            : ""
                          : ""
                      }
                      `}
                      onClick={() => handleAnswerOptions(index)}
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
            <div
              className={`w-full bg-azul_escuro hover:bg-blue-800 shadow-lg rounded-xl p-3 font-semibold text-lg text-center text-white ${
                respostaSelecionada !== null
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              onClick={() => handleNextQuestion()}
            >
              Próxima questão
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
