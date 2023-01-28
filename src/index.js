import express from 'express'
import { PORT } from './config.js'
import accountRoutes from './routes/account.routes.js'
import authRouter from './routes/auth.routes.js'

const app = express()

app.use(express.json())

app.use('/api/accounts', accountRoutes)
 
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})