import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, useEffect, useContext } from "react";
import { CriarLembrete } from "./criarLembrete/index";
import api from "@/api";
import { EditarLembrete } from "./editarLembrete";
import { AuthContext } from "../../context/AuthContext";
import { LembretesDTO } from "@/DTO/LembretesDTO";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Calendario() {
  const { user } = useContext(AuthContext);
  const [lembretes, setLembretes] = useState<LembretesDTO[]>([]);
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(today, "MMM-yyyy")
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });
  const selectedDayLembretes = lembretes.filter((lembrete) => {
    const dataAtualFormatada =
      adicionaZero(+selectedDay.getDate().toString()) +
      "/" +
      adicionaZero(selectedDay.getMonth() + 1) +
      "/" +
      selectedDay.getFullYear();
    return verificaData(dataAtualFormatada, lembrete);
  });

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/lembretes`);
      setLembretes(response.data.lembretes);
    };
    getData();
  }, []);

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function adicionaZero(numero: number) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }
  function verificaData(dataSelecionada: string, dataBackend: LembretesDTO) {
    if (dataSelecionada == dataBackend.data) {
      return dataBackend.data;
    }
    return false;
  }

  return (
    <div className="w-full">
      <div className="w-full flex items-start justify-between">
        <p className="text-blue-600 text-lg font-bold">Calendário</p>
        <p className="text-cinza_escura text-lg font-medium">Anotações</p>
      </div>
      <div className="flex flex-col">
        <div className="py-4 px-4 bg-blue-600 rounded-lg h-1/2">
          <div className="flex items-center justify-between mt-1">
            <button
              type="button"
              onClick={previousMonth}
              className="flex flex-none items-center justify-center text-[#F8F9FA] hover:text-azul_verde"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-[#F8F9FA] text-base">
              {format(firstDayCurrentMonth, "MMMM", {
                locale: ptBR,
              }).toUpperCase()}
            </h2>
            <button
              onClick={nextMonth}
              type="button"
              className="flex flex-none items-center justify-center text-[#F8F9FA] hover:text-azul_verde"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 mt-2 leading-6 text-center text-[#EDF2FF] text-[12px]">
            <p>DOM</p>
            <p>SEG</p>
            <p>TER</p>
            <p>QUA</p>
            <p>QUI</p>
            <p>SEX</p>
            <p>SAB</p>
          </div>
          <div className="grid grid-cols-7 content-center text-[14px]">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx == 0 && colStartClasses[getDay(day)],
                  "py-0.5 relative"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-[#FFFFFF] font-bold bg-[#92B2FB]",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-[#FFFFFF]",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-azul_verde",
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      "bg-azul_verde",
                    !isEqual(day, selectedDay) && "hover:bg-[#748FFC]",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "flex h-8 w-8 items-center justify-center rounded-full"
                  )}
                >
                  <time dateTime={format(day, "MMMM / yyyy")}>
                    {format(day, "d")}
                  </time>
                </button>
                {lembretes.some(
                  (lembrete) =>
                    (lembrete.id_professor || lembrete.id_aluno === user?.id) &&
                    isSameDay(parseISO(lembrete.data_masked), day)
                ) && (
                  <div className="w-1 h-1 bg-sky-500 rounded-lg absolute bottom-2 left-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full">
            <CriarLembrete />
          </div>
        </div>
        <section className="w-full h-[30vh] mt-3">
          <div className="h-full flex overflow-y-auto scrollbar-thin scrollbar-thumb pr-2">
            <ol className="w-full flex flex-col">
              {selectedDayLembretes.length > 0 ? (
                selectedDayLembretes.map((lembrete) =>
                  lembrete.id_professor || lembrete.id_aluno === user?.id ? (
                    <EditarLembrete lembrete={lembrete} key={lembrete.id} />
                  ) : (
                    <div className="w-full flex items-center justify-center mt-3">
                      <p>Sem lembretes</p>
                    </div>
                  )
                )
              ) : (
                <div className="w-full flex items-center justify-center mt-3">
                  <p>Sem lembretes</p>
                </div>
              )}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
