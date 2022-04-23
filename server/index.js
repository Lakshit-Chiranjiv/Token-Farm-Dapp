const fs = require('fs');
const cors = require('cors')
const express = require('express');
const jsonfilepath = './data/transactionsData.json';
let readdata = fs.readFileSync(jsonfilepath,'utf-8');
let transactions = JSON.parse(readdata);

const app = express();
app.use(express.json())
app.use(cors());

app.get('/trancs',(request,response)=>{

    response.send(transactions);
});

app.post('/newtransaction',(req,res) => {
        transactions = [...transactions,req.body]
        fs.writeFile(jsonfilepath,JSON.stringify(transactions,null,4),()=>{
        })
        res.json(req.body);
})


app.listen(5000, ()=>console.log("express server live at PORT 5000"));