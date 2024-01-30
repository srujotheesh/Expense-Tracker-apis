const express = require('express')
const app = express()
const mongoose =require('mongoose')
const port = process.env.PORT || 3000
const Expense=require('./models/product')
mongoose.connect("mongodb+srv://sruthik:sruthi17@cluster0.vpxxdwl.mongodb.net/?retryWrites=true&w=majority",{
    useUnifiedTopology:true
})
app.use(express.json());
app.get('/phone', async(req, res) => {
    const expenses=await  Expense.find();
    res.send(expenses)
  })
app.get('/phone/:id', async(req, res) => {
    try{
    const id =req.params.id;
    const result=await Expense.findById(id);
    console.log(req.params);
    if(result){
    res.send(result)
    }else{
       res.send("Not send"); 
    }}catch(err){
        res.send(err);
    }
    
  })
  app.delete('/phone/:id', async(req, res) => {
    try{
    const id =req.params.id;
    const result=await Expense.findByIdAndDelete(id);
    console.log(req.params.id);
    if(result){
    res.send(result)
    }else{
       res.send("Not send"); 
    }}catch(err){
        res.send(err);
    }
    
  })
  app.put('/phone/:id', async(req, res) => {
    try{
    const id =req.params.id;
    const newExpense =req.body;
    const updateValue=await Expense.findByIdAndUpdate(id,{$set:newExpense});
    console.log(updateValue);
    if(updateValue){
    res.send(updateValue)
    }else{
       res.send("not updated"); 
    }}catch(err){
        res.send(err);
    }
    
  })
/*app.get('/phone', (req, res) => {
  res.send('<h1>Hello World!<h1>')
})*/

app.post('/phone', async (req, res) => {
  const newExpense =req.body;
  await Expense.create(newExpense);
  console.log(newExpense)
    res.send('created!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})