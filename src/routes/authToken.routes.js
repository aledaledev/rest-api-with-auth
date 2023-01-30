import {Router} from 'express'
import {SignJWT, jwtVerify} from 'jose'
import { validateLoginDTO } from '../dto/validate-login.js'
import { Account } from '../model/db.js'

const authToken = Router()

//para usar token necesitamos 3 requisitos
//token debe contener info, tiene una duracion determinada y debe ser verificable
authToken.post('/login', validateLoginDTO, async (req,res) => {

    //validaciones aparte
    const {email, password} = req.body

    if(!email || !password) return res.status(400).json({error: "fill all fields"})

    const user = await Account.findOne({where:{email}})

    if(!user) return res.status(401).json({error:"user dont exists!"});
    if(user.password !== password) return res.status(401).json({error:"incorrect password!"});

    //jwt
    const jwtConstructor = new SignJWT({id:user.id})
    const encoder = new TextEncoder()
    const jwt = await jwtConstructor.setProtectedHeader({alg:'HS256', typ: 'JWT'})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

    //generalmente se envia en el body (puede usar una cookie pero a veces pesa mas de lo permitido)
    res.json({jwt})
})

authToken.get('/profile', async (req,res) => {
    const {authorization} = req.headers

    if(!authorization) return res.status(401).json({error:"not authenticated"})

    try {
        const encoder = new TextEncoder()
        const {payload} = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY))

        const user = await Account.findOne({where: {id:payload.id}})
        
        if(!user) return res.status(401).json({error:"user dont exists!"});

        res.json(user)
    } catch (error) {
        res.status(500).json({error})
    }
})

export default authToken