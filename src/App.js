import React, { useState } from 'react';
import './app.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleInputChange = (e) => setQuestion(e.target.value);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(question)
      const response = await fetch('http://localhost:5000/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }), // отправляем вопрос в формате { question: "ваш текст" }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setAnswer(data.data.answer);
      } else {
        setAnswer('Ошибка: ' + data.message);
      }
    } catch (error) {
      setAnswer('Ошибка: ' + error.message);
    }
  };

  return (
    <div className='main'>
      <div className='title'>
        <h1>Google Gemini Chatbot</h1>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={handleInputChange}
            placeholder="Введите ваш вопрос..."
          />
          <button type="submit">Спросить</button>
        </form>
      {answer && <div><strong>Ответ бота:</strong> {answer}</div>}
      </div>
    </div>
  );
}

export default App;
