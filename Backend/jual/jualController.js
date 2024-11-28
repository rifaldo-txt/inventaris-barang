const express = require('express')
const router = express.Router();

const {getJualBarang} = require('./jualService')

router.post('/', async(req,res)=> {
    try {
        const dataJual = req.body

        const jualBarang = await getJualBarang(dataJual);
        res.send({"berhasil menjual": jualBarang, "Pesan": "anda berhasil menjual"})
        
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router