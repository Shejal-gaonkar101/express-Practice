const express = require('express')

function block_1_httpMethods(){
    return new Promise((resolve)=>{
        const app = express()
         app.use(express.json)
         
        



        // now we will make server 
        //0 -> helps us get any port instead of hard coding (never used in production)
        const server = app.listen(0,async()=>{
           const port = server.address().port
           const base =`http://127.0.1:${port}`

           try{
             
            const listRes =await fetch(`${base}/routes`)
            const listData = await listRes.json()

            const createRes = await fetch(`${base}/route`, {
                method:"POST",
                header :{
                    'Content-Type':"application/json",
                    body:JSON.stringify({
                        name :"karwar-sirsi",
                        direction:"south"
                    })
                }
            })
            const created = await createRes.json()
           }
           catch(error){
              console.log(error)
           }
           server.close(()=>{
            console.log("Block 1 served....")
            resolve()
           })
        }) 
    
    })
}

async function main(){
    await block_1_httpMethods()
     await block_2_response()
    process.exit(0)
}

main()
