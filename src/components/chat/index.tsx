import { useContext, useEffect, useState } from 'react';
import socketServices from "@/util/socketServices";
import { AuthContext } from "@/context/AuthContext";

export function Chat({ idProfessor, nomeProfessor }: any) {
    const { user } = useContext(AuthContext);
    const [idSala, setIdSala] = useState("");
    const [messages, setMessages] = useState([]);

    let id_aluno = user?.id;
    let id_professor = idProfessor;
    let id_alunoSenha = user?.id_senha;

    // Ouvindo por novas mensagens
    useEffect(() => {
        socketServices.on("new_message", (data: any) => {
            // Adicionando a nova mensagem à lista de mensagens
            setMessages([...messages, { text: data.message, sender: data.sender }]);
        });

        return () => {
            socketServices.remove("new_message");
        };
    }, [messages]);

    const sendMessage = (text: string) => {
        // Enviando a mensagem para o servidor via websocket
        const objectMessage = [
            {
                _id: 1,
                user: {
                    _id: id_alunoSenha,
                    _idSala: idSala,
                    avatar: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                },
                text: text,
                createdAt: new Date(),
            }
        ]
        socketServices.emit("send_message", objectMessage, (res: any) => {
            console.log('mensagem enviada', res)
        });

    };

    // Inicializando sala e recebendo mensagens anteriores
    useEffect(() => {
        // Selecionando a sala e obtendo mensagens anteriores
        socketServices.emit(
            "select_room",
            {
                id_connected: id_aluno,
                id_professor,
                id_aluno,
                type: 'mobile'
            },
            (res: any) => {
                setIdSala(res.room_id);
                setMessages(res.messages);
            }
        );

    }, []);


    return (
        <div className="h-[30vh]">
            <div className="flex flex-col h-full bg-white w-full rounded-xl p-4 shadow-md shadow-[#4264eb86] justify-between">
            <MessageInput onSendMessage={sendMessage} />
                <div className="flex flex-col gap-2 mt-2 overflow-y-auto">
                    {messages.map((message, index) => {
                        return (
                            <Message key={index} text={message.text} sender={message.user?._id} id_alunoSenha={id_alunoSenha} />
                        );

                    }

                    )}
                </div>
                
            </div>
        </div>
    );
}

function Message({ text, sender, id_alunoSenha }: any) {
    const isUser = sender === id_alunoSenha; // Verifica se o remetente é o usuário atual

    // Define a classe CSS com base no remetente da mensagem
    const messageClass = isUser ? 'justify-end' : 'justify-start';
    // const bubbleClass = isUser ? 'bg-blue-500 text-white' : 'bg-[#49CACC] text-black';
    const bubbleClass = isUser ? 'bg-transparent text-gray-900' : 'bg-transparent text-gray-900';

    return (
        <div className="flex w-full pb-2 border-b-2 border-slate-200">
            <div className={`flex  ${messageClass}`}>
                <img src="https://i.pravatar.cc/" alt="avatar" className="rounded-full w-10" />
                <div className={`p-2 ml-3 rounded-lg w-full ${bubbleClass}`}>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
}

function MessageInput({ onSendMessage }: any) {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() !== '') {
            onSendMessage(inputText);
            setInputText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-between mt-4">
            <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="p-2 flex-1 mr-2 border rounded-xl focus:outline-none bg-[#E8E8E8] focus:ring focus:border-blue-300"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Enviar</button>
        </form>
    );
}
