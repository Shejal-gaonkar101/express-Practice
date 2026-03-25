const express = require('express')
const getFile = require('./01-express-intro')

function block_1_httpMethods(){
    return new Promise((resolve)=>{
        const app = express()
         app.use(express.json)
         
         const routes ={
            1: {
                id:1,
                name:"Anytime Express",
                direction :"North"
            },
            2: {
                id:2,
                name:"Anytime Express 2",
                direction :"East"
            }
         }
        
        let nextid = 3

        //list all train 
        app.get('/routes',(req,res)=>{
            res.json(Object.values(routes))
        })

        //single route
        app.get('/routes/:id',(req,res)=>{
            const route =routes[req.params.id]

            if(!route) return res.status(404).json({error:"No train on this id"})
            res.json(route)
        })

        app.post('/routes',(req,res)=>{
            const newRoute ={id: nextid++, ...req.body}
            routes[newRoute.id]=newRoute
            res.status(201).json(newRoute)
        })

        app.put("/routes/:id",(req,res)=>{
            const id = req.params.id
            if(!routes[id]) return res.status(404).json({error:"dont send something wemt wrong"})
            routes[id]={id: Number(id), ...req.body}
        })

        
        app.patch("/routes/:id",(req,res)=>{
            const id = req.params.id
            if(!routes[id]) return res.status(404).json({error:"dont send something wemt wrong"})
            
            const updates = req.body;

    // merge old data with new updates
            routes[id] = {
               ...routes[id],
               ...updates
            };
          // todo :complete this routr -done
        })

        
        app.delete("/routes/:id",(req,res)=>{
            const id = req.params.id
            if(!routes[id]) return res.status(404).json({error:"dont send something wemt wrong"})
            delete routes[id]
            res.status(204).end()
        })



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

function block_2_response(){
    return new promise ((resolve)=>{
        const app = express()
        app.use(express.json())
        //files/docs/readme.txt
        app.get('/files/*filepath',(req,res)=>{
            const filepath =req.params.filepath
            res.json({filepath, type:"wildcard"})
        })

        app
           .route("/scheduler")
           .get((req,res)=>{})
           .post((req,res)=>{})
           .put((req,res)=>{})
           .delete((req,res)=>{})

        app.use("/api",(req,res)=>{
            
        })

        const server =app.listen(0,async()=>{
            const port = server.address().port
            const base =`http://127.0.0.1:${port}`
            try{
               const text = await fetch(`${base}/text`)
               const textData = await text.json()
               console.log('GET /text',JSON.stringify(textData))

               console.log("+++++++++++++++++++++++++++++++++++")

               //TODO
            }catch(error){
                console.log(error)
            }
        })
    }) 
}


async function main(){
    await block_1_httpMethods()
     await block_2_response()
    process.exit(0)
}

main()