import {Router} from 'express'
import { Account } from '../model/db.js'

const router = Router()

//middleware solo para estos path
router.use((req,res,next) => {
    console.log(req.ip);
    next()
})

router.get('/', async (req,res) => {
    try {
        const accounts = await Account.findAll()
        res.json(accounts)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const account = await Account.findOne({ where: {id} })
        if(!account){
            return res.status(400).json({error:"bad request, incorrect id"})
        }
        res.json(account)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', async (req,res) => {
    try {
        const {name, email, phone} = req.body
        if(name===undefined || email===undefined || phone===undefined){
            return res.status(400).json({error:"bad request, fill the fields"})
        }
        await Account.create(req.body)
        res.json({message:"account created!"})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', async (req,res) => {
    try {        
        const {id} = req.params
        const {name, email, phone} = req.body
        if(name===undefined || email===undefined || phone===undefined){
            return res.status(400).json({error:"bad request, fill the fields"})
        }
        const editedAccount = await Account.update(req.body,{
            where:{id}
        })
        if(editedAccount[0]===0){
            return res.status(400).json({error:"bad request, incorrect id"})
        }
        res.json({message:"account updated!"})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const deletedAccount = await Account.destroy({
            where:{id}
        })
        if(deletedAccount===0){
            return res.status(400).json({error:"bad request, incorrect id"})
        }
        res.json("account deleted!")
    } catch (error) {
        res.status(500).json(error)
    }
})

router.use((req,res,next) => {
    res.status(404).json({error:"not found!"})
})

export default router