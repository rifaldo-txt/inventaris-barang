const express = require('express');

const {getBeliBarang} = require('./beliService')

const router = express.Router()

router.post('/', async (req,res)=> {
    try {
        const dataBeli = req.body
    
        const beliBarang = await getBeliBarang(dataBeli);
        res.send({"berhasil menambahkan": beliBarang, "Pesan": "anda berhasil membeli"})
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router