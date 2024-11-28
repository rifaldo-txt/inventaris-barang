//! fungsinya sebagai tempat penghubung DB dan BE

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

const findAllBarang = async () => {
    const barang = await prisma.barang.findMany();

    return barang;
}

const insertBarang = async (barangData) => {
    const barang = await prisma.barang.create({
        data:{
            nama_barang:barangData.nama_barang,
            kode_barang:barangData.kode_barang,
            jumlah_barang:barangData.jumlah_barang,
            harga_beli:barangData.harga_beli

        }
    })
    return barang;
}

const findBarangByID = async (barangID) => {
    const barang = await prisma.barang.findUnique({
        where:{
            id:parseInt(barangID)
        }
    })
    return barang;
}

const deleteBarang = async (barangID) => {
    const barang = await prisma.barang.delete({
        where:{
            id:barangID
        }
    })
    return barang;
}
const findBarangByKode = async (barangKode) => {
    const barang = await prisma.barang.findUnique({
        where:{
            kode_barang:barangKode
        }
    })
    return barang;
}



const updateBarang = async (barangData,barangID) => {
    const barang = await prisma.barang.update({
        where:{
            id:barangID
        },
        data:{
            nama_barang:barangData.nama_barang,
            kode_barang:barangData.kode_barang,
            jumlah_barang:barangData.jumlah_barang,
            harga_beli:barangData.harga_beli,
        }
    })
    return barang;
}

module.exports = {findAllBarang, findBarangByID, findBarangByKode, insertBarang, deleteBarang, updateBarang};