import { Grid, TextField, Button, Box, IconButton, InputLabel } from "@mui/material"
import { Delete } from '@mui/icons-material';
import { useState } from "react"
import IElementoMaterialInicial from "@/lib/types/IElementoMaterialInicial";
import IMaterialInicial from "@/lib/types/IMaterialInicial";
import toast, { Toaster } from 'react-hot-toast';
import { addMMPPInicial } from "@/lib/blockchain";

const ResiduosIniciales = () => {
    const [values, setValues] = useState<IMaterialInicial>({
        codigo: '',
        proveedor: '',
        elementos: [{ nombre: '', masa: '', porcentaje: '' }]
    })

    const saveMaterial = async() => {
        const promise = addMMPPInicial(values)

        toast.promise(promise, {
            loading: 'Guardando datos...',
            success: 'Datos guardados',
            error: 'Hubo un error al guardar los datos'
        })

        promise.catch(err => console.log(err))
    }

    return (
        <Grid container spacing={2} sx={{ width: '600px', margin: 'auto', maxWidth: '90%' }}>
            <Toaster />

            <Grid item xs={12}>
                <TextField
                    label="Codigo"
                    variant="outlined"
                    value={values.codigo}
                    onChange={ev => setValues({ ...values, codigo: ev.target.value })}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Proveedor"
                    variant="outlined"
                    value={values.proveedor}
                    onChange={ev => setValues({ ...values, proveedor: ev.target.value })}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputLabel sx={{ marginBottom: '10px' }}>Composición elementos:</InputLabel>
                <Elementos
                    elementos={values.elementos}
                    handleUpdate={(index: number, name: string, value: string) => {
                        let newElements = [...values.elementos]
                        newElements[index][name as keyof IElementoMaterialInicial] = value

                        setValues({ ...values, elementos: newElements })
                    }}
                    onDelete={(index: number) => {
                        const newElementos = [...values.elementos]
                        newElementos.splice(index, 1)

                        setValues({ ...values, elementos: newElementos })
                    }}
                />

                <Button
                    variant={"outlined"}
                    onClick={() => setValues({ ...values, elementos: [...values.elementos, { nombre: '', masa: '', porcentaje: '' }] })}
                    fullWidth
                >Añadir elemento</Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="outlined" onClick={saveMaterial}>Guardar</Button>
            </Grid>
        </Grid>
    )
}

const Elementos = ({
    elementos,
    handleUpdate,
    onDelete
}: {
    elementos: IElementoMaterialInicial[],
    handleUpdate: (index: number, name: string, value: string) => void,
    onDelete: (index: number) => void
}) => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {elementos.map((elemento, index) => (
            <Grid container spacing={2} key={index} sx={{ marginBottom: '16px' }}>
                <Grid item xs={5}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        value={elemento.nombre}
                        onChange={ev => handleUpdate(index, "nombre", ev.target.value)}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Masa"
                        value={elemento.masa}
                        type="number"
                        onChange={ev => handleUpdate(index, "masa", ev.target.value)}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Porcentaje"
                        value={elemento.porcentaje}
                        type="number"
                        onChange={ev => handleUpdate(index, "porcentaje", ev.target.value)}
                    />
                </Grid>

                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton onClick={() => onDelete(index)}>
                        <Delete />
                    </IconButton>
                </Grid>
            </Grid>
        ))}
    </Box>
)

export default ResiduosIniciales