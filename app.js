import express from 'express'
import morgan from 'morgan'
const app = express();
app.use(express.json());


const requesthandler = (req,res,next) =>{
    console.log(`${req.method} ${req.url}`)
    next();
}

app.use(requesthandler);

app.get('/',(req,res) =>{
    res.send('hello world')
});

app.post('/test',(req,res)=>{
    const input = req.body.input;
    let output ='';
    let data = [];

    for(let char of input){
     if( char === '('){
        data.push(char);
        output += char;
     } else if (char === ')'){
        if (data.length > 0){
            data.pop();
            output += char;
        }
     } else {
        output += char;
     }
       
    }

    for ( let i = data.length -1 ; i >= 0 ; i--){
        output = output.replace('(','')
    }

    res.json({output})
})



app.listen(3000 ,() =>{
    console.log('server is working on 3000')
})

// Given a string containing round brackets only “(“, “)” and alphanumeric characters, remove the least number of brackets so that the string is valid.
 
// String is valid if either it is empty or if there are brackets, they all close.
 
// Example -
// Input - “num)er(ol)ogy)”
// Output - “numer(ol)ogy”
// Input - “))((“
// Output - “”
