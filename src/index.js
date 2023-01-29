import express from 'express'
import { PORT } from './config.js'
import accountRoutes from './routes/account.routes.js'
import authRouter from './routes/auth.routes.js'
import authTokenRouter from './routes/authToken.routes.js'
import authSessionRouter from './routes/authSession.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/accounts', accountRoutes)
 
app.use('/auth', authRouter)

app.use('/auth-session', authSessionRouter)
app.use('/auth-token', authTokenRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})