require('./db')
const Query = require('./userQuery')
async function users(){
    try{
        console.log(await Query.getAllUsers())
    }catch(err){
        console.log(err)
    }
}
users()
console.log('END')