const {dojualBarang} = require('./jualRepository');
const {getBarangByKode} = require('../barang/barangService');

const getJualBarang = async (dataJual) => {
    const jualBarang = await dojualBarang(dataJual);
    const getCode = await getBarangByKode(dataJual.kode_barang);

    if (jualBarang.kode_barang != getCode){throw Error('kode tidak sesuai')
    }
return jualBarang;
}

module.exports = {getJualBarang}