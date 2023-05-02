import { getMMPPPostPretratamiento } from "@/lib/blockchain"
import IMaterialPostPretratamiento from "@/lib/types/IMaterialPostPretratamiento"
import { Box } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import React from "react"


const MaterialesDespuesPretratamiento = () => {
    const [materiasPrimas, setMateriasPrimas] = React.useState<IMaterialPostPretratamiento[]>([])

    React.useEffect(() => {
        getMMPPPostPretratamiento()
            .then(result => setMateriasPrimas(result))
    }, [])

    const columns: GridColDef[] = [
        { field: 'codigo', headerName: 'Codigo', width: 130 },
        { field: 'tipo', headerName: 'Tipo', width: 130 },
        { field: 'procesoOrigen', headerName: 'Proceso origen', width: 130 },
        { field: 'masa', headerName: 'Masa', width: 130 },
        { field: 'pureza', headerName: 'Pureza', width: 130 }
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

export default MaterialesDespuesPretratamiento