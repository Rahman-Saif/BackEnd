const express=require('express');
const app=express();
const cors=require('cors');
const port=process.env.PORT||5000;
// const phones=require('./phones.json');

const users=[
    {id:1 ,name:'saba' ,email:'saba@gmail.com'},
    {id:2 ,name:'saha' ,email:'saha@gmail.com'},
    {id:3 ,name:'aba' ,email:'aba@gmail.com'},
]

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello World!");
})

app.get('/users',(req,res)=>{
    res.send(users);
})

app.post('/users',(req,res)=>{
    console.log(req.body);
    const newUser=req.body;
    newUser.id=users.length+1;
    users.push(newUser);
    res.send(newUser)
})

// app.get('/phones',(req,res)=>{
//     res.send(phones);
// })

// app.get('/phones/:id',(req,res)=>{
//     const id=req.params.id;
//     console.log(`i need data for `,id);
// })

app.listen(port,()=>{
    console.log("app is running at port 5000");
})

