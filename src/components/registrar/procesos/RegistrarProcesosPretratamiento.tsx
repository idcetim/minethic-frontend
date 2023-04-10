import { Grid, TextField, Button } from "@mui/material"
import { useState } from "react"
import MultipleSelectChip from "./MultipleSelectChip"

const RegistrarProcesosPretratamiento = () => {
    const [values, setValues] = useState<{
        codigo: string,
        procesos: string[],
        materiasPrimas: string[]
    }>({
        codigo: '',
        procesos: [],
        materiasPrimas: []
    })
    const [materiasPrimas, setMateriasPrimas] = useState(['a1', 'a2', 'a3'])
    const procesos = ['Lavado', 'Prensado', 'Filtrado']

    return (
        <Grid container spacing={2} sx={{ width: '600px', margin: 'auto', maxWidth: '90%' }}>
            <Grid item xs={12}>
                <TextField label="Codigo" variant="outlined" fullWidth />
            </Grid>

            <Grid item xs={12}>
                <MultipleSelectChip
                    label="Procesos realizados"
                    options={procesos}
                    values={values.procesos}
                    setValues={(procesos: string[]) => setValues({...values, procesos: procesos})}
                />
            </Grid>

            <Grid item xs={12}>
                <MultipleSelectChip 
                    label="Materias primas empleadas" 
                    options={materiasPrimas} 
                    values={values.materiasPrimas}
                    setValues={(materiasPrimas: string[]) => setValues({...values, materiasPrimas: materiasPrimas})}
                />  
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="contained">Guardar</Button>
            </Grid>
        </Grid>
    )
}

export default RegistrarProcesosPretratamiento