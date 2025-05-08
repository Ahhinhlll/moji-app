import React, { useState } from "react";
import { chatBot } from "../../services/chatBotService";
import "./chat.scss";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;
    setLoading(true);

    try {
      const response = await chatBot({ message: input });
      const replyText = response.reply;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
        { text: replyText, sender: "bot" },
      ]);

      setInput("");
    } catch (error) {
      console.error("Error while chatting:", error);
    } finally {
      setLoading(false);
    }
  };
  const closeChat = () => {
    setIsOpen(false);
    setMessages([]);
  };

  return (
    <div className="position-fixed bottom-0 end-0 p-4 z-3">
      {/* Nút bật chat */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn rounded-circle d-flex justify-content-center align-items-center text-white shake-on-hover"
        style={{ backgroundColor: "#FFB0BD", width: "58px", height: "58px" }}
      >
        <i className="bi bi-chat-dots fs-2"></i>
      </button>

      {/* Khung chat nổi */}
      {isOpen && (
        <div
          className="modal-dialog modal-dialog-end m-0"
          style={{
            position: "fixed",
            bottom: "0px",
            right: "20px",
            width: "320px",
            zIndex: 9999,
          }}
        >
          <div className="modal-content shadow-lg custom-border">
            <div className="chat-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">Moji Shop</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={closeChat}
              ></button>
            </div>

            <div
              className="modal-body p-0"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div
                className="chat-box px-3 py-2"
                style={{
                  maxHeight: "300px",
                  minHeight: "300px",
                  overflowY: "auto",
                }}
              >
                <p className="timestamp">
                  {new Date().toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  {new Date().toLocaleDateString("vi-VN")}
                </p>

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex mb-3 ${
                      msg.sender === "user"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <img
                        src="/image/adminDefault.png"
                        alt="Bot"
                        className="avatar"
                      />
                    )}
                    <div className={`message ${msg.sender}`}>
                      {msg.sender === "bot" && (
                        <div className="bot-name">Moji</div>
                      )}
                      <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="d-flex justify-content-center text-muted">
                    <em>Đang soạn tin...</em>
                  </div>
                )}
              </div>

              <div className="chat-footer">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tin nhắn..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                />
                <button className="btn-chat" onClick={sendMessage}>
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
