import React, { useState } from "react";
import { chatBot } from "../../services/chatBotService";
import "./chat.scss";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;
    setLoading(true);

    try {
      const response = await chatBot({ message: input });
      const replyText = response.reply;

      setMessages((prev) => [
        ...prev,
        { text: input, sender: "user" },
        { text: replyText, sender: "bot" },
      ]);
      setInput("");
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setMessages([]); // nếu muốn reset luôn tin nhắn mỗi khi đóng
  };

  return (
    <div className="position-fixed bottom-0 end-0 p-4 z-3">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn rounded-circle d-flex justify-content-center align-items-center text-white shake-on-hover"
          style={{ backgroundColor: "#FFB0BD", width: "58px", height: "58px" }}
        >
          <i className="bi bi-chat-dots fs-2"></i>
        </button>
      )}

      {isOpen && (
        <div
          className="chat-box-container shadow-lg custom-border"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "320px",
            backgroundColor: "#fff",
            zIndex: 9999,
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div className="chat-header d-flex justify-content-between align-items-center p-2 bg-dark text-white">
            <h5 className="mb-0">Moji Shop</h5>
            <button
              className="btn-close btn-close-white"
              onClick={closeChat}
            ></button>
          </div>

          <div
            className="chat-body px-3 py-2"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              background: "#f9f9f9",
            }}
          >
            <p className="timestamp text-center small text-muted">
              {new Date().toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              {new Date().toLocaleDateString("vi-VN")}
            </p>

            {messages.map((msg, idx) => (
              <div
                key={idx}
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
                  {msg.sender === "bot" && <div className="bot-name">Moji</div>}
                  <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="d-flex justify-content-center text-muted">
                <em>Đang trả lời...</em>
              </div>
            )}
          </div>

          <div className="chat-footer d-flex p-2 border-top">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
