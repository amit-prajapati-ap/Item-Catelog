import express from 'express'
import cors from 'cors'
import { itemRouter } from './routes/item.route.js';
import cookieParser from 'cookie-parser'
import { sendEnquiryEmail } from './controllers/query.controller.js';

const app = express()
const allowedOrigins = [`${process.env.FRONTEND_URL}`]

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: allowedOrigins }))

app.get('/', (_, res) => {
    res.send("API Working")
})

//API Endpoint 
app.use('/api/item', itemRouter)
app.post('/api/send-enquiry', sendEnquiryEmail)

export default app