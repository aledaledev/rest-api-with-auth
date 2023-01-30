import {Type} from '@sinclair/typebox'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import Ajv from 'ajv'

//const DTO_PROPERTY_NAMES = ['email','password']

//json scheme
/*const loginDTOSchema = {
    type: 'object',
    properties: {
        email: {type: 'string', format:'email'},
        password: {type: 'string'}
    },
    required: ['email','password'],
    additionalProperties: false,
}*/

//con @sinclair/typebox
//me daba un error con la actualizacion nueva volvi a la 0.23.4
const loginTypeboxSchema = Type.Object({
    email: Type.String({
        format: 'email',
        errorMessage: {
            type: "the email type must be string",
            format: "email must contain valid email"
        }
    }),
    password: Type.String({
        errorMessage: {
            type: "the password type must be string",
        }
    }),
}, {
    additionalProperties: false,
    errorMessage:{
        additionalProperties: "object's format is not valid",
    }
})

//                  tomara rodos los errores que haya
const ajv = new Ajv({allErrors:true})
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier')
addErrors(ajv)

const validate = ajv.compile(loginTypeboxSchema)

export const validateLoginDTO = (req,res,next) => {
    const isDTOValid = validate(req.body)
    
    if(!isDTOValid) return res.status(400).json({error: validate.errors})

    /*const loginDto = req.body

    if(!typeof loginDto !== 'object') res.status(401).json({error:"body must be json format"})

    const bodyPropertyNames = Object.keys(loginDto)
    
    const checkProperties = bodyPropertyNames.length === DTO_PROPERTY_NAMES.length && bodyPropertyNames.every(bodyPropertyName => DTO_PROPERTY_NAMES.includes(bodyPropertyName))

    if(!checkProperties){
        res.status(400).json({error:'body must contain email & password'})
    }*/

    next()
}
