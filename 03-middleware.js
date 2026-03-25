const express = require('express')

function block_1_httpMethods(){
    return new Promise((resolve)=>{
        const app = express()
         app.use(express.json)
         
        //request Logger //middleware(Built In)
        //All request must be logged here 
        //use next when writing middle ware , directs to next middle ware , written at end
        //this is the basic middle ware 
        app.use((req,res,next)=>{
            //Business Logic
            //add to db
            //write in some file 
            
            const logEntry = `${req.method} :${req.url}`
            localStorage.push(logEntry)
            console.log(`[LOG] -- ${logEntry}`)

            //if your request hangs forever 
            next()
            
        })


        app.use((req,res,next)=>{
             req.startTime = Date.now()

             res.on('finish',()=>{
                const duration = Date.now() - req.startTime
                console.log(`[Timer] -- ${req.method} - ${req.url} took ${duration}ms`)

             })

             next()
        })

        function authMe(req,res,next){
          const token = req.header['x-auth-token']

          if(!token){
            return res.status(401).json({error: "No Token, Please login"})
          }

          if(token!=="secret"){
             return res.status(403).json({error:"Invalid token"})
           }

           //token -> extract data from token -> userID ,email , admin

           req.user ={id :1,name:"Hitesh",role:"admin"}

           next()

             
        }
        
        function getRole(role){
          return (req,res,next)=>{
           if(!req.user || req.user.role !== role){
             return res.status(403).json({error: `Role ${role} required`})
           }
        }
            next()
        }

        function rateLimit(maxRequest){
            let count =0

            return (req,res,next)=>{
                count++
                if(count>maxRequest){
                    return res.status(429).json({error:"Too mnay request"}
                    )
                }
                next()
            }
        }

        const limitedEndPoint = rateLimit(3)
        app.get('/limited',limitedEndPoint,(req,res)=>{})

        app.get('/profile',authMe, getRole('admin'), ()=>{})
        

        app.get('/profile',authMe, getRole('teacher'), ()=>{})
        

        app.get('/profile',authMe, getRole('student'), ()=>{})
        

        app.get('/profile',authMe, getRole(['admin','teacher','student']), ()=>{})




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
