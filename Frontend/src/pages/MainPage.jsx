import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useFetchBarang } from "../context/barang/useFetchBarang"

const MainPage = () => {
    const {data, isLoading} = useFetchBarang();

    const TableBarang = ()=> {
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nama Barang</TableCell>
                        <TableCell>Kode Barang</TableCell>
                        <TableCell>Stok Barang</TableCell>
                        <TableCell>Harga DI Beli</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((item)=> (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.nama_barang}</TableCell>
                            <TableCell>{item.kode_barang}</TableCell>
                            <TableCell>{item.jumlah_barang}</TableCell>
                            <TableCell>{item.harga_beli}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return(
        <Box sx={{ mt: 5, justifyContent: "center", display: "flex" }}>
            {isLoading? (<CircularProgress/>):(<TableBarang/>)}
        </Box>
    )
}

export default MainPage