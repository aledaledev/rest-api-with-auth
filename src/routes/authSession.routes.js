import {Router} from 'express'
import {nanoid}  from 'nanoid'
import { Account } from '../model/db.js'

const sessions = []
const authSession = Router()

authSession.post('/login', async (req,res) => {
    const {email, password} = req.body

    if(!email || !password) return res.status(400).json({error: "fill all fields"})

    const user = await Account.findOne({where:{email}})

    //por tema de seguridad se podria mandar un mismo mensaje para ambos
    if(!user) return res.status(401).json({error:"user dont exists!"});
    if(user.password !== password) return res.status(401).json({error:"incorrect password!"});

    const sessionId = nanoid()
    sessions.push({sessionId, id:user.id})
    //validar que no exista el mismo sessionId

    //httpOnly: el cliente no va poder leer la cookie, el servidor crea y guarda el id
    //secure: le dice al navegador que la cookie solo se envie cuando la solicitud es por https
    //domain: si no va nada, ira el propio dominio que genera la cookie
    //expires/maxAge: eliminara la cookie en una fecha dada (tambien deberiamos borrar la session en ese tiempo)
    res.cookie('sessionId',  sessionId, {httpOnly:true})

    res.json({message:`user ${user.name} authenticated!`})
})

//en posteriores peticiones el navegador pondra la cookie en el header automaticamente 
authSession.get('/profile', async (req,res) => {
    const {cookies} = req

    if(!cookies.sessionId) return res.status(401).json({error:"not authenticated"})
    const userSession = sessions.find(session => session.sessionId === cookies.sessionId)

    if(!userSession) return res.status(401).json({error:"not authenticated"})

    const user = await Account.findOne({where: {id:userSession.id}})

    if(!user) return res.status(401).json({error:"user dont exists!"});

    //dont work
    //delete user.password

    res.json(user)
})

export default authSession