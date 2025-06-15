import React, { useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your AI assistant. What's your name?" }
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState({});

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const updatedMessages = [...messages, userMessage];

    let botResponse = "";
    const newLead = { ...lead };

    if (step === 0) {
      newLead.name = input;
      botResponse = `Nice to meet you, ${input}. What's your budget?`;
    } else if (step === 1) {
      newLead.budget = input;
      botResponse = "Great! What's your preferred location?";
    } else if (step === 2) {
      newLead.location = input;
      botResponse = "Got it. How soon are you looking to move?";
    } else if (step === 3) {
      newLead.timeline = input;

      // Simple lead classification logic
      const budget = parseInt(newLead.budget.replace(/[^0-9]/g, ""));
      let classification = "Invalid";
      if (!isNaN(budget)) {
        if (budget > 1000000) classification = "Hot";
        else if (budget > 200000) classification = "Cold";
      }

      botResponse = `Thanks ${newLead.name}! Based on your inputs, we classify this lead as: ${classification}`;
    }

    setMessages([...updatedMessages, { from: "bot", text: botResponse }]);
    setLead(newLead);
    setStep(step + 1);
    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2>💬 AI WhatsApp Bot (Lead Qualification)</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.from === "bot" ? "flex-start" : "flex-end",
              backgroundColor: msg.from === "bot" ? "#e0e0e0" : "#add8e6"
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input
          type="text"
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your reply..."
        />
        <button style={styles.button} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial",
    padding: "1rem",
    maxWidth: "600px",
    margin: "auto"
  },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    backgroundColor: "#f9f9f9"
  },
  message: {
    padding: "0.75rem",
    borderRadius: "1rem",
    maxWidth: "70%"
  },
  inputBox: {
    display: "flex",
    marginTop: "1rem"
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    marginLeft: "0.5rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px"
  }
};

export default App;