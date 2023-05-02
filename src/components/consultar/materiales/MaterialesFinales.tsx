import { getMMPPFinales } from "@/lib/blockchain"
import IMaterialFinal from "@/lib/types/IMateriaFinal"
import { Box } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import React from "react"

const MaterialesFinales = () => {
    const [materiasPrimas, setMateriasPrimas] = React.useState<IMaterialFinal[]>([])
    
    React.useEffect(() => {
        getMMPPFinales()
            .then(result => setMateriasPrimas(result))
    }, [])

    const columns: GridColDef[] = [
        { field: 'codigo', headerName: 'Codigo', width: 130 },
        { field: 'tipoMaterial', headerName: 'Tipo material', width: 130 },
        { field: 'masa', headerName: 'Masa', width: 130 },
        { field: 'porcentajeSubstitucion', headerName: 'Porcentaje substitución', width: 200 },
        { field: 'procesoOrigen', headerName: 'Proceso origen', width: 130 }
    ]

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid 
                rows={materiasPrimas}
                columns={columns}
                autoHeight={true}               
            />
        </Box>
    )
}

export default MaterialesFinales