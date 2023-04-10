import { addMMPPFinal } from "@/lib/blockchain"
import IMaterialFinal from "@/lib/types/IMateriaFinal"
import { Grid, InputLabel, Select, TextField, FormControl, MenuItem, Button } from "@mui/material"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

const MaterialesFinales = () => {
    const [values, setValues] = useState<IMaterialFinal>({
        codigo: '',
        tipoMaterial: 'Imán',
        masa: '',
        porcentajeSubstitucion: '',
        procesoOrigen: ''
    })
    const [procesosOrigen, setProcesosOrigen] = useState(['p1', 'p2', 'p3'])

    const saveMaterial = async() => {
        const promise = addMMPPFinal(values)

        toast.promise(promise, {
            loading: 'Guardando datos...',
            success: 'Datos guardados ✅',
            error: 'Hubo un error al guardar los datos ❌'
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
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <FormControl sx={{width: '100%'}}>
                    <InputLabel>Tipo de material</InputLabel>
                    <Select
                        label="Tipo de material"
                        value={values.tipoMaterial}
                        onChange={ev => setValues({...values, tipoMaterial: ev.target.value})}
                    >
                        <MenuItem value="Imán">Imán</MenuItem>
                        <MenuItem value="Cátodo">Cátodo</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <TextField
                    label="Masa"
                    variant="outlined"
                    value={values.masa}
                    fullWidth
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    label="Porcentaje substitución"
                    variant="outlined"
                    value={values.porcentajeSubstitucion}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <FormControl sx={{width: '100%'}}>
                    <InputLabel>Proceso de origen</InputLabel> 
                    <Select
                        label="Proceso de origen"
                        value={values.procesoOrigen}
                        onChange={ev => setValues({ ...values, procesoOrigen: ev.target.value })}
                    >
                        {procesosOrigen.map((proceso, index) => (
                            <MenuItem value={proceso} key={index}>{proceso}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="contained" onClick={saveMaterial}>Guardar</Button>
            </Grid>
        </Grid>
    )
}

export default MaterialesFinales