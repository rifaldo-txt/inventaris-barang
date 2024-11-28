const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

const doBeliBarang = async (dataBeli) => {
    const beliBarang = await prisma.beli.create({
        data:{
            kode_barang:dataBeli.kode_barang,
            jumlah_beli:dataBeli.jumlah_beli,
            harga_beli:dataBeli.harga_beli
        }
    })
    return beliBarang
}

module.exports = {doBeliBarang}

