import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react"; // Si tienes Lucide, sino usa cualquier icono SVG

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
          className="fixed z-50 transition-transform duration-200 transform bottom-6 right-6 hover:scale-105 focus:scale-105 focus:outline-none"
          onClick={() => setOpen(true)}
          aria-label="Abrir chat IA"
        >
          <img
            src="/images/robot-peek.png"
            alt="Robot saludando para abrir el chat"
            className="h-[300px] w-[200px] drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)]"
          />
        </button>
      )}

      {/* Ventana de chat */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[95vw]">
          <div className="relative flex flex-col">
            <img
              src="/images/robot-wave.png"
              alt="Robot asomándose sobre el chat"
              className="pointer-events-none absolute left-1/2 top-11 w-36 -translate-x-1/2 -translate-y-[60%] drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]"
            />
            <div className="flex flex-col mt-12 overflow-hidden border border-green-500 shadow-2xl rounded-2xl bg-black-900">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl bg-green-600/90">
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
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        msg.role === "user"
                          ? "rounded-br-sm bg-green-600 text-white"
                          : "rounded-bl-sm bg-green-100 text-black"
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
                className="flex items-center gap-2 px-3 py-2 border-t border-green-500 rounded-b-2xl bg-black-800"
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
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
