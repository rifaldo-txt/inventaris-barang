import {
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PrimarySearchAppBar from "../../components/navbar/navbar";
import { useFetchBarang } from "../../context/barang/useFetchBarang";
import {Add, AddOutlined} from "@mui/icons-material";
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "../../lib/axios";
import { useCreateBarang } from "../../context/barang/useCreateBarang";
import axios from "axios";

const dataBarangSchema = z.object({
    id: z.number().optional(),
    nama_barang : z.string().min(5,"masukan minimal 5 karakter"),
    kode_barang : z.string().min(8, "masukan minimal 8 karakter").max(16, "maksimal 16 karakter"),
    jumlah_barang: z.number(),
    harga_beli: z.number().min(100, "harga barang minimal 100 rupiah")

})

export type DataBarangSchema = z.infer<typeof dataBarangSchema>;


const Dashboard: React.FC = () => {
  const [hoverModal, setHoverModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

    const {register, handleSubmit, formState, reset, setValue} = useForm<DataBarangSchema>({
        resolver : zodResolver(dataBarangSchema),
        shouldFocusError: false,
        mode : 'onBlur'
    })
    const { data, isLoading, refetch } = useFetchBarang();

    const {mutate: CreateMutateBarang} = useCreateBarang({
      onSuccess: () => {
        refetch();
      }
    });

    
    const {mutate: deleteMutateBarang} = useMutation({
      mutationFn: async (idBarang: number) => {
        const deleteBarang = await AxiosInstance.delete(`/items/${idBarang}`)
        return deleteBarang;
      },
      onSuccess: () => {
        refetch();
      }
    })

    const {mutate: editMutateBarang} = useMutation({
      mutationFn: async (values : DataBarangSchema) => {
        const editBarang = await AxiosInstance.put(`/items/${values.id}`, values)
        return editBarang;
      },
      onSuccess: () => {
        refetch();
      }
    })
    
    const onSubmit = handleSubmit((values)=> {
      if (!values.id){
        //! lakukan edit
        CreateMutateBarang(values)
      }else{
        editMutateBarang(values)
      }

        setHoverModal(false)
        setIsEdit(false)
        reset();
    })

    const onClickDelete = (idBarang: number) => {
      const confirmed = confirm(`apakah anda yakin menghapus barang dengan id ${idBarang}?`)
      if (confirmed === true){
        deleteMutateBarang(idBarang)
      }
    }

    const onClickEdit = (items) => {
      setHoverModal(true),
      setIsEdit(true),
      setValue("id", items.id)
      setValue("nama_barang",items.nama_barang )
      setValue("kode_barang", items.kode_barang)
      setValue("jumlah_barang", items.jumlah_barang)
      setValue("harga_beli", items.harga_beli)
    }

    const onClickBatal = () => {
      setHoverModal(false),
      setIsEdit(false)
    }

  const TableBarang = () => {
    return(
        <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography>ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Nama Barang</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Kode Barang</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Jumlah Barang</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Harga Barang</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Status</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      marginBottom: 2,
                      display: "table-row",
                    }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nama_barang}</TableCell>
                    <TableCell>{item.kode_barang}</TableCell>
                    <TableCell>{item.jumlah_barang}</TableCell>
                    <TableCell>{item.harga_beli}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={()=> {onClickDelete(item.id)}}>Delete</Button>
                      <Button variant="contained" color="primary" sx={{ml:1}} onClick={()=>{onClickEdit(item)}} >EDIT</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
    )
  }

  const InputModal = () => {
    return(
      <Modal 
                open={hoverModal}
                onClose={()=> {setHoverModal(false)}}
        >
            <Container
        sx={{
            position: "absolute",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            width:'90%',
            paddingBottom:10
          }}
        >
            <Typography variant="h5" textAlign={"center"}>
              {isEdit === true ? `ini edit`: 'ini input'}
            </Typography>

            {/* tempat input! */}
            <Stack mt={5}spacing={3}>
              {isEdit === true ? (
                <TextField type="number" variant="standard" label={"ID barang"} disabled {...register("id",{valueAsNumber: true})}></TextField>
              ): null}

                <TextField type="text" variant="standard" placeholder="Nama Barang" rows={1} {...register("nama_barang")}></TextField>
                {formState.errors.nama_barang && (<p>{formState.errors.nama_barang.message}</p>)}

                <TextField type="text" variant="standard" placeholder="Kode Barang" multiline rows={1} {...register("kode_barang")}></TextField>
                {formState.errors.kode_barang && (<p>{formState.errors.kode_barang.message}</p>)}

                <TextField type="number" variant="standard" placeholder="Jumlah Barang" {...register('jumlah_barang', {valueAsNumber : true})}></TextField>
                {formState.errors.jumlah_barang && (<p>{formState.errors.jumlah_barang.message}</p>)}

                <TextField type="number" variant="standard" placeholder="Harga Barang" rows={1} {...register("harga_beli", {valueAsNumber:true})}></TextField>
                {formState.errors.harga_beli && (<p>{formState.errors.harga_beli.message}</p>)}

            </Stack>


            <Box mt={10}
            sx={{
                bottom: 20,
                left: 50,
                right: 50,
                position: "fixed",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
                <Button color="error" variant="contained" sx={{width:100}} onClick={()=>{onClickBatal()}}>Batal</Button>
                <Button color="primary" variant="contained" sx={{width:100}} onClick={onSubmit} >Kirim</Button>
            </Box>
        </Container>
        </Modal>
    )
  }

  return (
    <Box>
      <InputModal/>
      <PrimarySearchAppBar />
      <Box sx={{ mt: 5, justifyContent: "center", display: "flex" }}>
        <Stack width={"90%"} direction={"column"}>
          <Box sx={{ justifyContent: "left", display: "flex", width: "95%" }}>
            <Button
              color="success"
              variant="contained"
              endIcon={<AddOutlined/>}
              sx={{ width: "10%", md: 4 }}
              onClick={() => {
                setHoverModal(true);
              }}
            >
              Tambah
            </Button>
          </Box>

          {isLoading ? (
            <CircularProgress />
          ) : (
            <TableBarang/>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
