import { Grid, TextField, Button, FormControl, InputLabel, Select, SelectChangeEvent, OutlinedInput, Box, Chip, MenuItem, Theme, useTheme } from "@mui/material"
import { useState } from "react"
import MultipleSelectChip from "./MultipleSelectChip"
import React from "react"
import { addProcesoPostratamiento, getMMPPPostPretratamiento } from "@/lib/blockchain"
import IMaterialPostPretratamiento from "@/lib/types/IMaterialPostPretratamiento"
import IProcesoPostratamiento from "@/lib/types/IProcesoPostratamiento"
import toast, { Toaster } from 'react-hot-toast'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const RegistrarProcesosPostratamiento = () => {
    const [values, setValues] = useState<IProcesoPostratamiento>({
        codigo: '',
        procesosRealizados: [],
        materiasPrimasEmpleadas: []
    })
    const [materiasPrimas, setMateriasPrimas] = useState<IMaterialPostPretratamiento[]>([])
    const procesos = ['Lavado', 'Prensado', 'Filtrado']

    React.useEffect(() => {
        getMMPPPostPretratamiento()
            .then(result => setMateriasPrimas(result))
    }, [])

    const handleChangeMMPP = (event: SelectChangeEvent<typeof values.materiasPrimasEmpleadas>) => {
        const {
            target: { value }
        } = event

        setValues({
            ...values,
            materiasPrimasEmpleadas: typeof value === "string" ? value.split(',') : value
        })
    }

    const saveProceso = async() => {
        const promise = addProcesoPostratamiento(values)

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
                <MultipleSelectChip
                    label="Procesos realizados"
                    options={procesos}
                    values={values.procesosRealizados}
                    setValues={(procesos: string[]) => setValues({...values, procesosRealizados: procesos})}
                />
            </Grid>

            <Grid item xs={12}>
                <FormControl sx={{width: '100%'}}>
                    <InputLabel>Materias primas empleadas</InputLabel>
                    <Select
                        multiple
                        value={values.materiasPrimasEmpleadas}
                        onChange={handleChangeMMPP}
                        input={<OutlinedInput label={"Materias primas empleadas"} />}
                        renderValue={selected => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value} label={materiasPrimas[Number(value)].codigo} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {materiasPrimas.map(option => (
                            <MenuItem
                                key={option.id}
                                value={option.id}
                            >
                                {option.codigo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="outlined" onClick={saveProceso}>Guardar</Button>
            </Grid>
        </Grid>
    )
}

export default RegistrarProcesosPostratamiento