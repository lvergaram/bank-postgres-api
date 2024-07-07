import express from "express";
import 'dotenv/config';
import cuentaRouter from './cuentas/cuenta.routes.js';
import transferenciaRouter from './transferencias/transferencia.routes.js';


const app = express();

app.use( express.json())
app.use( express.urlencoded({extended:true}))

app.use('/api/v1/cuenta', cuentaRouter )
app.use('/api/v1/transferencia', transferenciaRouter )

app.get('/', (req, res)=>{
  res.send('Holiwis')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, ()=> {
  console.log(` app listening on port ${PORT} `)
})
