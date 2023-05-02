import { getMMPPIniciales } from "@/lib/blockchain"
import IElementoMaterialInicial from "@/lib/types/IElementoMaterialInicial"
import IMaterialInicial from "@/lib/types/IMaterialInicial"
import { Box, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import React from "react"
import ListAltIcon from '@mui/icons-material/ListAlt';

const ResiduosIniciales = () => {
    const [materiasPrimas, setMateriasPrimas] = React.useState<IMaterialInicial[]>([])
    const [modalData, setModalData] = React.useState<{
        open: boolean,
        elements: IElementoMaterialInicial[]
    }>({
        open: false,
        elements: []
    })

    React.useEffect(() => {
        getMMPPIniciales()
            .then(result => setMateriasPrimas(result))
    }, [])

    const columns: GridColDef[] = [
        { field: 'codigo', headerName: 'Codigo', width: 130 },
        { field: 'proveedor', headerName: 'Proveedoor', flex: 1, width: 130 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<Tooltip title={"Mostrar elementos registrados"}><ListAltIcon /></Tooltip>}
                        label="Delete"
                        onClick={() => setModalData({ open: true, elements: materiasPrimas[id as number].elementos })}
                        color="inherit"
                    />,
                ];
            },
        }
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

            <Dialog open={modalData.open} onClose={() => setModalData({ ...modalData, open: false })}>
                <TableContainer>
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Masa</TableCell>
                                <TableCell align="right">Porcentaje</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {modalData.elements.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                    <TableCell align="right">{row.masa}</TableCell>
                                    <TableCell align="right">{row.porcentaje}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dialog>
        </Box>
    )
}

export default ResiduosIniciales