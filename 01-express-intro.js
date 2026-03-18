const express = require('express')

function block_1_basicServer(){
    return new Promise((resolve)=>{
        const app = express()
        app.use(express.json)
        
        //Normal route 
        app.get('/menu',(req,res)=>{
          res.json({
            iteams:[
                'thali',
                'biryani',

            ]
          })
        })

       //query param
        app.get('/search',(req,res)=>{
            const {q ,limit}=req.query //chaicode.com/cart?q=biryan&limit=5
            res.json({
                query :q,
                limit:limit ||'10'
            })
        })


        //Route params
        app.get('/menu/:id', (req,res)=>{
         const {id}= req.params
          res.json({
            iteam:id,
            price:149
          })
        })

        //post route
        app.post('/order',(req,res)=>{
            const order =req.body 
            res.status(201).json({
                status :'created',
                order
            })
        })

        // now we will make server 
        //0 -> helps us get any port instead of hard coding (never used in production)
        const server = app.listen(0,async()=>{
           const port = server.address().port
           const base =`127.0.1:${port}`

           try{
            //serialization an deserilaization Hw
            const menuRes = await fetch(`${base}/menu`)
            const menuData = await menuRes.json()
            console.log('GET /menu',JSON.stringify(menuData))

            console.log("+++++++++++++++++++++++++++++++++++")

            //creating 2nd end point 
            const searchRes=  await fetch(`${base}/search?q=biryani&limit`)
            const searchData = await searchRes.json()
            console.log('GET /search',JSON.stringify(searchData))

            console.log("+++++++++++++++++++++++++++++++++++")

            //handling menu
            const iteamRes = await fetch(`${base}/menu/42`)
            const iteamResData = await iteamRes.json()
             console.log('POST /menu',JSON.stringify(menuIteamData))

             console.log("+++++++++++++++++++++++++++++++++++")

             const createOrder = await fetch(`${base}/order`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    body:JSON.stringify({
                        dish:'biryani',
                        quantity:2
                    })
                }
             })
             const createOrderData = await createOrder.json()
             console.log('POST /order',JSON.stringify(createOrderData))

           }
           catch(error){

           }
        }) 
    
    })
}

async function main(){
    await block_1_basicServer()

    process.exit(0)
}

main()