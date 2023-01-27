import {Router} from 'express'
import { Account } from '../model/db.js'

const router = Router()

router.get('/', async (req,res) => {
    const accounts = await Account.findAll()
    res.json(accounts)
})

router.post('/', async (req,res) => {
    await Account.create(req.body)
    res.json({message:"account created!"})
})

router.use((req,res,next) => {
    res.status(404).json({error:"not found!"})
})

export default router