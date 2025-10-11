import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react"; // Si tienes Lucide, sino usa cualquier icono SVG

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "¡Hola! ¿En qué puedo ayudarte?" }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Fake respuesta IA para demo (reemplaza con tu API si quieres)
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { role: "ai", text: "🤖 (Demo) ¡Recibido! Pronto podré responderte con IA real." }
      ]);
    }, 700);
  };

  return (
    <>
      {/* Botón flotante */}
      {!open && (
        <button
          className="fixed z-50 flex items-center justify-center p-4 text-white transition bg-green-500 rounded-full shadow-lg bottom-6 right-6 hover:bg-green-600"
          onClick={() => setOpen(true)}
          aria-label="Abrir chat IA"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Ventana de chat */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[95vw] bg-black-900 border border-green-500 rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-green-600/90 rounded-t-2xl">
            <span className="font-semibold text-white">Asistente JJ</span>
            <button onClick={() => setOpen(false)} aria-label="Cerrar chat" className="text-white hover:text-green-100">
              <X size={22} />
            </button>
          </div>
          {/* Chat */}
          <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto bg-black-900">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-green-600 text-white rounded-br-sm"
                      : "bg-green-100 text-black rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {/* Input */}
          <form
            className="flex items-center gap-2 px-3 py-2 border-t border-green-500 bg-black-800 rounded-b-2xl"
            onSubmit={handleSend}
          >
            <input
              className="flex-1 px-2 py-2 text-white placeholder-gray-400 bg-transparent outline-none"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="p-2 text-green-500 transition hover:text-green-400" aria-label="Enviar">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
