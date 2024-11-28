const {doBeliBarang} = require('./beliRepository');
const {getBarangByKode} = require('../barang/barangService');


const getBeliBarang = async (dataBeli)=> {
    
    const beliBarang = await doBeliBarang(dataBeli);
    const getCode = await getBarangByKode(dataBeli.kode_barang)
    
    if (beliBarang.kode_barang != getCode){throw Error('kode tidak sesuai')
    }
    return beliBarang;
}
module.exports = {getBeliBarang}