const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

const dojualBarang = async (dataJual)=> {
    const jualBarang = await prisma.jual.create({
        data:{
            kode_barang:dataJual.kode_barang,
            jumlah_jual:dataJual.jumlah_jual,
            harga_jual:dataJual.harga_jual
        }
    })
    return jualBarang;
}


module.exports = {dojualBarang}