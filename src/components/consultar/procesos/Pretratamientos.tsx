import { getMMPPIniciales, getProcesosPretratamiento } from "@/lib/blockchain"
import IProcesoPretratamiento from "@/lib/types/IProcesoPretratamiento"
import { Box, Dialog, Tooltip, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography, DialogTitle, DialogContent } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import React from "react"
import ListAltIcon from '@mui/icons-material/ListAlt';
import IMaterialInicial from "@/lib/types/IMaterialInicial"


const Pretratamientos = () => {
    const [procesos, setProcesos] = React.useState<IProcesoPretratamiento[]>([])
    const [modalDataMaterias, setModalDataMaterias] = React.useState<{
        open: boolean,
        elements: IMaterialInicial[]
    }>({
        open: false,
        elements: []
    })
    const [materiasPrimas, setMateriasPrimas] = React.useState<IMaterialInicial[]>([])

    React.useEffect(() => {
        getProcesosPretratamiento()
            .then(result => setProcesos(result))

        getMMPPIniciales()
            .then(result => setMateriasPrimas(result))
    }, [])

    const columns: GridColDef[] = [
        { field: 'codigo', headerName: 'Codigo', width: 130, flex: 1 },
        { field: 'procesosRealizados', headerName: 'Procesos realizados', flex: 1, valueFormatter: params => params.value.join(', ') },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        key={0}
                        icon={<Tooltip title="Mostrar elementos registrados"><ListAltIcon /></Tooltip>}
                        label="Delete"
                        onClick={() => setModalDataMaterias({
                            open: true,
                            elements: procesos[id as number].materiasPrimasEmpleadas.map(materiaId => {
                                return materiasPrimas[materiaId as number]
                            })
                        })}
                        color="inherit"
                    />
                ]
            }
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
                rows={procesos}
                columns={columns}
                autoHeight={true}
            />

            <Dialog open={modalDataMaterias.open} onClose={() => setModalDataMaterias({ ...modalDataMaterias, open: false })}>
                <DialogTitle>Materias primas tratadas</DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table sx={{ width: '100%' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th"><b>Codigo</b></TableCell>
                                    <TableCell align="right"><b>Proveedor</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {modalDataMaterias.elements.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">{row.codigo}</TableCell>
                                        <TableCell align="right">{row.proveedor}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default Pretratamientos