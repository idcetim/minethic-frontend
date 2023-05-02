import { addMMPPFinal, getProcesosPostratamiento } from "@/lib/blockchain"
import IMaterialFinal from "@/lib/types/IMateriaFinal"
import IProcesoPostratamiento from "@/lib/types/IProcesoPostratamiento";
import { useTheme } from "@emotion/react";
import { Grid, InputLabel, Select, TextField, FormControl, MenuItem, Button } from "@mui/material"
import React from "react";
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

const MaterialesFinales = () => {
    const [values, setValues] = useState<IMaterialFinal>({
        codigo: '',
        tipoMaterial: '',
        masa: '',
        porcentajeSubstitucion: '',
        procesoOrigen: undefined
    })
    const [procesosOrigen, setProcesosOrigen] = useState<IProcesoPostratamiento[]>([])

    React.useEffect(() => {
        getProcesosPostratamiento()
            .then(result => setProcesosOrigen(result))
    }, [])

    console.log(procesosOrigen)

    const saveMaterial = async() => {
        const promise = addMMPPFinal(values)

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
                    onChange={ev => setValues({...values, codigo: ev.target.value})}
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
                    onChange={ev => setValues({...values, masa: ev.target.value})}
                    fullWidth
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    label="Porcentaje substitución"
                    variant="outlined"
                    value={values.porcentajeSubstitucion}
                    onChange={ev => setValues({...values, porcentajeSubstitucion: ev.target.value})}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <FormControl sx={{width: '100%'}}>
                    <InputLabel>Proceso de origen</InputLabel> 
                    <Select
                        label="Proceso de origen"
                        value={values.procesoOrigen}
                        onChange={ev => setValues({ ...values, procesoOrigen: ev.target.value as any })}
                    >
                        {procesosOrigen.map(proceso => (
                            <MenuItem value={proceso.id} key={proceso.id}>{proceso.codigo}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="outlined" onClick={saveMaterial}>Guardar</Button>
            </Grid>
        </Grid>
    )
}

export default MaterialesFinales