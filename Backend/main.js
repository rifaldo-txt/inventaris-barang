const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const beliController = require('./beli/beliController')
const jualConrtoller = require('./jual/jualController')

const barangController = require('./barang/barangController')

dotenv.config();
const app = express();
const port = process.env.PORT

app.use(cors());
app.use(bodyParser.json())
app.use('/barang', barangController);
app.use('/buy', beliController);
app.use('/sell', jualConrtoller)


app.listen(port,()=>{
    console.log(`app telah berjalan pada port ${port}`)
})