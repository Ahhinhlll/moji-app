const { chatWithGemini } = require("../config/geminiService");

const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message)
      return res.status(400).json({ error: "Thiếu nội dung tin nhắn" });

    const reply = await chatWithGemini(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server", detail: error.message });
  }
};

module.exports = { handleChat };
