//! controll penyambung ke main untuk "/"

const { getBarangByID, getDeleteBarang, getUpdateBarang, getBarangByKode } = require('./barangService');

const express = require('express');
const { findAllBarang, insertBarang, findBarangById } = require('./barangRepository');
const router = express.Router();

router.get('/', async(req,res)=>{
    try {
        const barang = await findAllBarang();

        res.send(barang)
    } catch (error) {
        return res.status(404)
    }
})

router.post('/', async (req,res)=> {
    try {
        const barangData = req.body
    
        const barang = await insertBarang(barangData);

        res.send(barang)
    } catch (error) {
        res.status(500).send(error.Message)
    }
})

router.get('/:id', async (req,res)=> {
    try {
        const barangID = req.params.id
    
        const barang = await getBarangByID(parseInt(barangID));
        
        res.send({"data": barang, "message":`barang dengan ID ${barangID} telah ditemukan`})
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete('/:id', async (req,res)=> {
    try {
        const barangID = req.params.id;
        
        const barang = await getDeleteBarang(parseInt(barangID))
        res.send({"data": barang, "Message": `data dengan id ${barang.id} telah dihapus`})
    } catch (err) {
        res.status(404).send(err.message)
    }

router.get('/kode/:kode', async (req,res)=> {
    try {
        const barangKode = req.params.kode
    
        const barang = await getBarangByKode(barangKode);
        
        res.send({"data": barang, "message":`barang dengan kode ${barangKode} telah ditemukan`})
    } catch (err) {
        res.status(400).send(err.message)
    }
})


})

router.put('/:id', async (req, res)=>{
    try {
        const barangID = req.params.id;
        const barangData = req.body;

        const barang = getUpdateBarang(barangData,parseInt(barangID));
        res.send({"barang": barang,"Pesan":`data dari id ${barangID} telah di ubah`})
        
    } catch (err) {
        res.status(404).send(err.message)
    }
})

module.exports = router