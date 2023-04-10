import { Button, Grid, InputLabel, MenuItem, Select, TextField, FormControl } from "@mui/material"
import MultipleSelectChip from "../procesos/MultipleSelectChip"
import { useState } from "react"
import IMaterialPostPretratamiento from "@/lib/types/IMaterialPostPretratamiento"
import { addMMPPPostPretratamiento } from "@/lib/blockchain"
import toast, { Toaster } from 'react-hot-toast';

const MaterialesDespuesPretratamiento = () => {
    const [values, setValues] = useState<IMaterialPostPretratamiento>({
        codigo: '',
        tipo: '',
        procesoOrigen: '',
        masa: '',
        pureza: '',
    })
    const [procesosOrigen, setProcesosOrigen] = useState(['p1', 'p2', 'p3'])

    const saveMaterial = async() => {
        const promise = addMMPPPostPretratamiento(values)

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
                    onChange={ev => setValues({...values, codigo: ev.target.value})}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Tipo"
                    variant="outlined"
                    value={values.tipo}
                    onChange={ev => setValues({...values, tipo: ev.target.value})}
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

            <Grid item xs={6}>
                <TextField
                    label="Masa"
                    variant="outlined"
                    value={values.masa}
                    onChange={ev => setValues({...values, masa: ev.target.value})}
                    fullWidth
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    label="Pureza"
                    variant="outlined"
                    value={values.pureza}
                    onChange={ev => setValues({...values, pureza: ev.target.value})}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="outlined" onClick={saveMaterial}>Guardar</Button>
            </Grid>
        </Grid>
    )
}

export default MaterialesDespuesPretratamiento