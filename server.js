const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = 5000

const GOOGLE_API_KEY = 'AIzaSyAqX0MwJ5mxwopuijC-ECS3jeioZYX4iEA'

app.use(cors())
app.use(bodyParser.json())

app.post('/generate-content', async (req, res) => {
  const {question} = req.body

  if (!question) {
    return res.status(400).json({
      status: 'error',
      error_code: 400,
      message: 'Вопрос не может быть пустым.',
    })
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_API_KEY}`,
      {
        contents: [{parts: [{text: question}]}],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.status === 200) {
      const answer = response.data.candidates[0].content.parts[0].text
      return res.json({status: 'success', data: {answer}})
    } else {
      console.error(`Google API Error: ${response.status} - ${response.data}`)
      return res.status(500).json({
        status: 'error',
        message: 'Ошибка при обращении к API Google',
        details: response.data,
      })
    }
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({status: 'error', message: error.message})
  }
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
