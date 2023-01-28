import {Sequelize, DataTypes} from 'sequelize'
import config from '../config.js'

const sequelize = new Sequelize(config.database, config.user, config.password,{
    host: config.host,
    dialect: config.dialect
})

export const Account = sequelize.define('account', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    phone:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING
    }
})

Account.sync({force:false})
.then(() => console.log('db async!'))