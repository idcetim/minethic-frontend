import { getMMPPPostPretratamiento, getProcesosPostratamiento } from "@/lib/blockchain"
import IProcesoPostratamiento from "@/lib/types/IProcesoPostratamiento"
import { Box, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import React from "react"
import ListAltIcon from '@mui/icons-material/ListAlt';
import IMaterialPostPretratamiento from "@/lib/types/IMaterialPostPretratamiento"

const Postratamientos = () => {
    const [procesos, setProcesos] = React.useState<IProcesoPostratamiento[]>([])
    const [modalDataMaterias, setModalDataMaterias] = React.useState<{
        open: boolean,
        elements: IMaterialPostPretratamiento[]
    }>({
        open: false,
        elements: []
    })
    const [materiales, setMateriales] = React.useState<IMaterialPostPretratamiento[]>([])

    React.useEffect(() => {
        getProcesosPostratamiento()
            .then(result => setProcesos(result))

        getMMPPPostPretratamiento()
            .then(result => setMateriales(result))
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
                        icon={<Tooltip title="Mostrar elementos registrados"><ListAltIcon /></Tooltip>}
                        label="Delete"
                        onClick={() => setModalDataMaterias({
                            open: true,
                            elements: procesos[id as number].materiasPrimasEmpleadas.map(materiaId => {
                                return materiales[materiaId as number]
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
                                    <TableCell component="th">Codigo</TableCell>
                                    <TableCell align="right">Masa</TableCell>
                                    <TableCell align="right">Pureza</TableCell>
                                    <TableCell align="right">Tipo</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {modalDataMaterias.elements.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">{row.codigo}</TableCell>
                                        <TableCell align="right">{row.masa}</TableCell>
                                        <TableCell align="right">{row.pureza}</TableCell>
                                        <TableCell align="right">{row.tipo}</TableCell>
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

export default Postratamientos