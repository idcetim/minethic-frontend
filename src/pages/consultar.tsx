// import CustomNavbar from "@/components/Navbar"
// import { getMMPPIniciales } from "@/lib/blockchain"
// import IMaterialInicial from "@/lib/types/IMaterialInicial"
// import { Box, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material"
// import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
// import React from "react"
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import IElementoMaterialInicial from "@/lib/types/IElementoMaterialInicial"

// const Consultar = () => {





//     return (
//         <main>
//             <CustomNavbar />

//             <Box sx={{ width: '90%', paddingTop: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '5%', marginTop: '20px' }}>
//                 <Box
//                     sx={{
//                         height: 500,
//                         width: '100%',
//                         '& .actions': {
//                             color: 'text.secondary',
//                         },
//                         '& .textPrimary': {
//                             color: 'text.primary',
//                         },
//                     }}
//                 >
//                     <DataGrid
//                         rows={materiasPrimas}
//                         columns={columns}
//                         autoHeight={true}
//                     />
//                 </Box>
//             </Box>

//             <Dialog open={modalData.open} onClose={() => setModalData({ ...modalData, open: false })}>
//                 <TableContainer>
//                     <Table sx={{ width: '100%' }}>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Nombre</TableCell>
//                                 <TableCell align="right">Masa</TableCell>
//                                 <TableCell align="right">Porcentaje</TableCell>
//                             </TableRow>
//                         </TableHead>

//                         <TableBody>
//                             {modalData.elements.map((row, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell component="th" scope="row">{row.nombre}</TableCell>
//                                     <TableCell align="right">{row.masa}</TableCell>
//                                     <TableCell align="right">{row.porcentaje}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Dialog>
//         </main>
//     )
// }

// export default Consultar

const Consultar = () => {

}

export default Consultar