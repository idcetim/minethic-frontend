import { addProcesoPretratamiento, getMMPPIniciales } from "@/lib/blockchain";
import { Grid, TextField, Button, FormControl, InputLabel, Select, OutlinedInput, Box, Chip, SelectChangeEvent, MenuItem, Theme, useTheme } from "@mui/material"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast'
import IProcesoPretratamiento from "@/lib/types/IProcesoPretratamiento";
import React from "react";
import IMaterialInicial from "@/lib/types/IMaterialInicial";

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

const procesos = ['Lavado', 'Prensado', 'Filtrado']

const RegistrarProcesosPretratamiento = () => {
    const [values, setValues] = useState<IProcesoPretratamiento>({
        codigo: '',
        procesosRealizados: [],
        materiasPrimasEmpleadas: []
    })
    const [materiasPrimas, setMateriasPrimas] = React.useState<IMaterialInicial[]>([])

    React.useEffect(() => {
        getMMPPIniciales()
            .then(result => setMateriasPrimas(result))
    }, [])

    const theme = useTheme();

    const saveProceso = async() => {
        const promise = addProcesoPretratamiento(values)

        toast.promise(promise, {
            loading: 'Guardando datos...',
            success: 'Datos guardados',
            error: 'Hubo un error al guardar los datos'
        })

        promise.catch(err => console.log(err))
    }

    const handleChangeProcesos = (event: SelectChangeEvent<typeof values.procesosRealizados>) => {
        const {
            target: { value },
        } = event;
        setValues({
            ...values,
            procesosRealizados: typeof value === 'string' ? value.split(',') : value
        });
    };

    const handleChangeMMPP = (event: SelectChangeEvent<typeof values.materiasPrimasEmpleadas>) => {
        const {
            target: { value }
        } = event
        setValues({
            ...values,
            materiasPrimasEmpleadas: typeof value === 'string' ? value.split(',') : value
        })
    }

    return (
        <Grid container spacing={2} sx={{ width: '600px', margin: 'auto', maxWidth: '90%' }}>
            <Toaster />

            <Grid item xs={12}>
                <TextField 
                    label="Codigo" 
                    variant="outlined" 
                    fullWidth 
                    onChange={ev => {
                        setValues({
                            ...values,
                            codigo: ev.target.value
                        })
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel>Procesos realizados</InputLabel>
                    <Select
                        multiple
                        value={values.procesosRealizados}
                        onChange={handleChangeProcesos}
                        input={<OutlinedInput label={"Procesos realizados"} />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {procesos.map((option, index) => (
                            <MenuItem
                                key={option}
                                value={option}
                                style={getStyles(option, values.procesosRealizados, theme)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel>Materias primas empleadas</InputLabel>
                    <Select
                        multiple
                        value={values.materiasPrimasEmpleadas}
                        onChange={handleChangeMMPP}
                        input={<OutlinedInput label={"Materias primas empleadas"} />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={materiasPrimas[Number(value)].codigo} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {materiasPrimas.map((option) => (
                            <MenuItem
                                key={option.id}
                                value={option.id}
                                style={getStyles(option.codigo, values.procesosRealizados, theme)}
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

export default RegistrarProcesosPretratamiento