// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Установите ваш API-ключ Hugging Face
const HUGGING_FACE_API_KEY = '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';

app.use(cors());
app.use(bodyParser.json());

app.post('/predict', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            { inputs: question },
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            const answer = response.data[0].generated_text;
            return res.json({ answer });
        } else {
            console.error(`Hugging Face API Error: ${response.status} - ${response.data}`);
            return res.status(500).json({ error: 'Ошибка при обращении к API Hugging Face', details: response.data });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
