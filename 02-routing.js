const express = require('express')


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
             
            
          // todo :complete this routr 
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

        //Types of response 

        //send text
        app.get('/text',(req,res)=>{
            res.send("Hello from chaicode")

        })

        app.get('/json',(req,res)=>{
            res.json({
                framework :"Express",
                version:"6.1.1"
            })
        })

        app.get ('/not-founnd',(req,res)=>{
            res.status(404).json({
                error:"Page not found"
            })
        })

        app.get('/health',(req,res)=>{
            res.sendStatus(200)
        })

        app.get('./old-menu',(req,res)=>{
            //if we want to see old menu
            res.redirect(301,'/new-menu')
            //redirect is special method where there is no then 

        })

        app.get('/xml',(req,res)=>{
            res.type('application/xml').send('<dish> <name>Biryani</name></dish>')
        })

        app.get('/custom-header',(req,res)=>{
           res.set('X-powered-By','KeepCoding')
           res.set('X-Request-Id','1234568')
           res.json({
            message:'custom header set'
           })
           //Uses of these headers in CORS ,caching ,tracing 

        })

        app.get('/no-content',(req,res)=>{
            res.status(204).end()
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