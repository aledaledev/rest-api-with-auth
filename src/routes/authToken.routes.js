import {Router} from 'express'

const authToken = Router()

authToken.post('/login', async (req,res) => {
    const {email, password} = req.body

    if(!email || !password) return res.status(400).json({error: "fill all fields"})

    const user = await Account.findOne({where:{email}})

    //por tema de seguridad se podria mandar un mismo mensaje para ambos
    if(!user) return res.status(401).json({error:"user dont exists!"});
    if(user.password !== password) return res.status(401).json({error:"incorrect password!"});

    res.json({message:`user ${user.name} authenticated!`})
})

export default authToken