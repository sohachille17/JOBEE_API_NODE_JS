const DatabaseConnection = require("./db");
const mongoose = require("mongoose");


async function connections(){
    try{
        const connection = new DatabaseConnection(process.env.DB_LOCAL_URL)
    
        const con = await connection.onConnectToMongodb()

    if(con){
        console.log(`Connected to mongodb successfully on ${con.connection.host}`)

    }else{
        console.log(`Could'nt connect to mongodb sorry!!`)
    }

    }catch(error){
        console.log(error)
    }
}

// .then(con =>
// console.log(`Mongodb database connected with ${con.connection.host}`
// )).catch(err => console.log(err.message))

module.exports = connections;