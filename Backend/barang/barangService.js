//! tempat membuat syarat syarat 

const { findBarangByID, deleteBarang, updateBarang, findBarangByKode } = require("./barangRepository")

const getBarangByID = async(barangID)=> {
    if (typeof barangID !== "number"){
        return Error ('id tidak ketemu')
    }
    const barang = await findBarangByID(barangID);

    if (!barang){throw Error(`Tidak ada barang dengan id ${barangID} di stok`)};
    return barang
}

const getDeleteBarang = async (barangID) => {
    await getBarangByID(barangID)

    const barang = await deleteBarang(barangID)
    return barang
}
const getBarangByKode = async (barangKode) => {
    const barang = await findBarangByKode(barangKode)

    if(!barang){throw Error('kode tidak ada')}
    return barang.kode_barang;
}


const getUpdateBarang = async (barangData,barangID)=> {
    await getBarangByID(barangID)
    
    const barang = await updateBarang(barangData, barangID);
    return barang
}

module.exports = {getBarangByID,getBarangByKode, getDeleteBarang, getUpdateBarang};