import { Router } from "express";
import { Account } from "../model/db.js";

const authRouter = Router()

//endpoint publico (no autenticado o no autorizado)
authRouter.get('/public', (req,res) => {
    res.send("public endpoint")
})

//password no deberia estar en db en formato texto plano, usamos un hash
//reconocer al usuario en el sistema 
//endpoint autenticado (para todo usuario o admin registrado en db)
authRouter.post('/authenticated', async (req,res) => {
    const {email, password} = req.body

    if(!email || !password) return res.status(400).json({error: "fill all fields"})

    const user = await Account.findOne({where:{email}})

    //por tema de seguridad se podria mandar un mismo mensaje para ambos
    if(!user) return res.status(401).json({error:"user dont exists!"});
    if(user.password !== password) return res.status(401).json({error:"incorrect password!"});

    res.json({message:`user ${user.name} authenticated!`})
})

//endpoint autorizado (solo para admins)
authRouter.post("/authorized", async (req,res) => {
    const {email, password} = req.body

    if(!email || !password) return res.status(400).json({error: "fill all fields"})

    const user = await Account.findOne({where:{email}})

    if(user.role !== 'admin') return res.status(403).json({error: "only admins have access"})

    if(!user) return res.status(401).json({error:"user dont exists!"});
    if(user.password !== password) return res.status(401).json({error:"incorrect password!"});

    res.json({message:`admin user ${user.name}`})
})

export default authRouter