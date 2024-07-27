const express=require('express');
const cors=require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port=process.env.PORT||5000;
//6dvUIMHwAxyT9zlB

const app=express();
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://rahmansaif413:F7t9TT1l7KALnH15@cluster0.m4uphyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();

    const database = client.db("userDB");
    const haiku = database.collection("user");

    app.get('/user',async(req,res)=>{
      const cursor=haiku.find();
      const result=await cursor.toArray();
      res.send(result);
    })

    app.get('/user/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)}
      const user=await haiku.findOne(query);
      res.send(user)
    })

  app.post('/user', async (req, res) => {
  const user = req.body;
  console.log(`new user`, user);
  try {
    const result = await haiku.insertOne(user);
    res.send(result);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send({ message: 'Error creating user' }); // Informative error message
  }
});

app.put('/user/:id',async(req,res)=>{
  const id=req.params.id;
  const updatedUser=req.body;
  console.log(updatedUser);
  const filter={_id:new ObjectId(id)}
  const option={upsert:true};

  const updatedUser={
    $set:{
      name:user.name,
      email:user.email
    }
  }

  const result=await haiku.updateOne(filter,updatedUser,option);
  res.send(result);
})

  app.delete('/user/:id',async(req,res)=>{
    const id=req.params.id;
    console.log('please delete',id);
    const query={_id:new ObjectId(id)}

    const result=await haiku.deleteOne(query);
    res.send(result);
  })

  } finally {
   
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('simple crud is running');
})

app.listen(port,()=>{
    console.log(`crud is running ${port}`)
})