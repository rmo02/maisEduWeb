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
import { useState, useEffect } from "react";
import { CriarLembrete } from "./criarLembrete/index";
import { api } from "../../api/app";
import { EditarLembrete } from "./editarLembrete";
// import { EditarLembrete } from "../Modals/Lembretes/EditarLembrete";
// import { AuthContext } from "../../context/auth";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Calendario() {
  //   const { user } = useContext(AuthContext);
  const [lembretes, setLembretes] = useState([]);
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(today, "MMM-yyyy")
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const meetings = lembretes;
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });
  const selectedDayMeetings = meetings.filter((meeting: any) => {
    const dataAtualFormatada =
      adicionaZero(+selectedDay.getDate().toString()) +
      "/" +
      adicionaZero(selectedDay.getMonth() + 1) +
      "/" +
      selectedDay.getFullYear();
    return verificaData(dataAtualFormatada, meeting);
  });

  // const selectedDayMeetings = lembretes.length > 0 ? lembretes.filter((meeting: any) => {
  //     const dataAtualFormatada =
  //       adicionaZero(+selectedDay.getDate().toString()) +
  //       "/" +
  //       adicionaZero(selectedDay.getMonth() + 1).toString() +
  //       "/" +
  //       selectedDay.getFullYear();
  //     return verificaData(dataAtualFormatada, meeting);
  //   }) : [];

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
  function verificaData(dataSelecionada: any, dataBackend: any) {
    if (dataSelecionada == dataBackend.data) {
      return dataBackend.data;
    }
    return false;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="py-4 px-6 bg-blue-600 rounded-lg">
          <div className="flex items-center justify-between mt-1">
            <div>
              <h2 className="font-semibold text-[#F8F9FA] text-base">
                {format(firstDayCurrentMonth, "MMMM / yyyy", {
                  locale: ptBR,
                }).toUpperCase()}
              </h2>
            </div>
            <div className="flex flex-row">
              <button
                type="button"
                onClick={previousMonth}
                className="flex flex-none items-center justify-center p-1.5 text-[#F8F9FA] hover:text-[#18C4B3]"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="ml-2 flex flex-none items-center justify-center p-1.5 text-[#F8F9FA] hover:text-[#18C4B3]"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 mt-2 leading-6 text-center text-[#EDF2FF] opacity-70 text-[12px]">
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
                  "py-1 relative"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-[#02C4B2] font-bold",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-[#FFFFFF]",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) && isToday(day) && "bg-[#02C4B2]",
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      "bg-[#02C4B2]",
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
                {meetings.some((meeting: any) => {
                  return (
                    meeting.id_professor ===
                      "a618b405-0eaa-4992-a3ae-21dafb816646" &&
                    meeting.id_aluno === null &&
                    isSameDay(parseISO(meeting.data_masked), day)
                  );
                }) && (
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
        <section>
          <ol>
            {selectedDayMeetings.length > 0 ? (
              selectedDayMeetings.map((meeting: any) =>
                meeting.id_professor ===
                  "a618b405-0eaa-4992-a3ae-21dafb816646" &&
                meeting.id_aluno === null ? (
                  <Meeting meeting={meeting} key={meeting.id} />
                ) : (
                  <div key={meeting.id}>
                    <p>Sem lembretes</p>
                  </div>
                )
              )
            ) : (
              <div>
                <p>Sem lembretes</p>
              </div>
            )}
          </ol>
        </section>
      </div>
    </div>
  );
}
function Meeting({ meeting }: { meeting: any }) {
  return (
    <div>
      <div className="w-full">
        <div className="flex flex-col justify-center mt-4 rounded-lg bg-[#FFFFFF] h-24 px-4">
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-[#748FFC] text-[18px] font-bold mb-2">
                {meeting.title}
              </p>
            </div>
            <div>
              <EditarLembrete eventId={meeting.id} />
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-[#748FFC] text-[18px] font-bold mb-2">
              {meeting.description}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-[#748FFC] text-[14px] font-medium ">
                {meeting.start.slice(0, 5)} - {meeting.end.slice(0, 5)}
              </p>
            </div>
            <div>
              <p className="text-[#02C4B2] text-[14px] font-roboto ">
                {meeting.turma.name}
              </p>
            </div>
          </div>
        </div>
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
