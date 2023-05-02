import CustomNavbar from "@/components/Navbar"
import { getMMPPFinales, getMMPPIniciales, getMMPPPostPretratamiento, getProcesosPostratamiento, getProcesosPretratamiento } from "@/lib/blockchain"
import IMaterialFinal from "@/lib/types/IMateriaFinal"
import IMaterialInicial from "@/lib/types/IMaterialInicial"
import IMaterialPostPretratamiento from "@/lib/types/IMaterialPostPretratamiento"
import IProcesoPostratamiento from "@/lib/types/IProcesoPostratamiento"
import IProcesoPretratamiento from "@/lib/types/IProcesoPretratamiento"
import { Box, Button, IconButton, Paper, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import React from "react"
import SearchIcon from '@mui/icons-material/Search';

enum TipoElemento {
    MateriaInicial="Material inicial",
    MateriaPostPretratamiento="Material post-pretratamiento",
    MateriaFinal="Material final",
    ProcesoPretratamiento="Proceso pretratamiento",
    ProcesoPostratamiento="Proceso postratamiento"
}

type IElemento = IMaterialInicial | IMaterialPostPretratamiento | IMaterialFinal | IProcesoPretratamiento | IProcesoPostratamiento

interface IElementoYTipo {
    elemento: IElemento,
    tipoElemento: TipoElemento
}

const ConsultarCodigo = () => {
    const [materiasIniciales, setMateriasIniciales] = React.useState<IMaterialInicial[]>([])
    const [materiasPostPretratamiento, setMateriasPostPretratamiento] = React.useState<IMaterialPostPretratamiento[]>([])
    const [materiasFinales, setMateriasFinales] = React.useState<IMaterialFinal[]>([])
    const [procesosPretratamiento, setProcesosPretratamiento] = React.useState<IProcesoPretratamiento[]>([])
    const [procesosPostratamiento, setProcesosPostratamiento] = React.useState<IProcesoPostratamiento[]>([])

    const [elementosEncontrados, setElementosEncontrados] = React.useState<IElementoYTipo[] | null>(null)
    const [steps, setSteps] = React.useState<string[] | null>(null)
    const [activeStep, setActiveStep] = React.useState<number>(0)
    const [stepsContent, setStepsCotent] = React.useState<{
        materiasFinales: IMaterialFinal[],
        procesosPostratamiento: IProcesoPostratamiento[],
        materiasPostPretratamiento: IMaterialPostPretratamiento[],
        procesosPretratamiento: IProcesoPretratamiento[],
        materiasIniciales: IMaterialInicial[]
    }>({
        materiasFinales: [],
        procesosPostratamiento: [],
        materiasPostPretratamiento: [],
        procesosPretratamiento: [],
        materiasIniciales: []
    })

    React.useEffect(() => {
        getMMPPIniciales().then(res => setMateriasIniciales(res))
        getMMPPPostPretratamiento().then(res => setMateriasPostPretratamiento(res))
        getMMPPFinales().then(res => setMateriasFinales(res))
        getProcesosPretratamiento().then(res => setProcesosPretratamiento(res))
        getProcesosPostratamiento().then(res => setProcesosPostratamiento(res))
    }, [])

    const ejecutarBusqueda = (codigo: string) => {
        const elementosEncontrados = [] as IElementoYTipo[]

        for (const materia of materiasIniciales) {
            if (materia.codigo == codigo) {
                elementosEncontrados.push({
                    elemento: materia,
                    tipoElemento: TipoElemento.MateriaInicial
                })
            }
        }

        for (const materia of materiasPostPretratamiento) {
            if (materia.codigo == codigo) {
                elementosEncontrados.push({
                    elemento: materia,
                    tipoElemento: TipoElemento.MateriaPostPretratamiento
                })
            }
        }

        for (const materia of materiasFinales) {
            if (materia.codigo == codigo) {
                elementosEncontrados.push({
                    elemento: materia,
                    tipoElemento: TipoElemento.MateriaFinal
                })
            }
        }

        for (const materia of procesosPretratamiento) {
            if (materia.codigo == codigo) {
                elementosEncontrados.push({
                    elemento: materia,
                    tipoElemento: TipoElemento.ProcesoPretratamiento
                })
            }
        }

        for (const materia of procesosPostratamiento) {
            if (materia.codigo == codigo) {
                elementosEncontrados.push({
                    elemento: materia,
                    tipoElemento: TipoElemento.ProcesoPostratamiento
                })
            }
        }

        if (elementosEncontrados.length == 1) {
            getSteps(elementosEncontrados[0])
        }
        else {
            setElementosEncontrados(elementosEncontrados)
        }
    }

    const getSteps = (elemento: IElementoYTipo) => {
        let stepMateriasFinales: IMaterialFinal[]
        let stepProcesosPostratamiento: IProcesoPostratamiento[]
        let stepMateriasPostPretratamiento: IMaterialPostPretratamiento[]
        let stepProcesosPretratamiento: IProcesoPretratamiento[]
        let stepMateriasIniciales: IMaterialInicial[]

        switch (elemento.tipoElemento) {
            case TipoElemento.MateriaFinal:
                stepMateriasFinales = [elemento.elemento as IMaterialFinal]
                stepProcesosPostratamiento = stepMateriasFinales.map(materia => procesosPostratamiento[materia.procesoOrigen as number])
                stepMateriasPostPretratamiento = stepProcesosPostratamiento[0].materiasPrimasEmpleadas.map(materia => materiasPostPretratamiento[materia as number])
                stepProcesosPretratamiento = stepMateriasPostPretratamiento.map(material => procesosPretratamiento[material.procesoOrigen as number])
                stepMateriasIniciales = stepProcesosPretratamiento.map(proceso => proceso.materiasPrimasEmpleadas.map(materia => materiasIniciales[materia as number])).flat()

                setStepsCotent(values => ({
                    materiasFinales: stepMateriasFinales,
                    procesosPostratamiento: stepProcesosPostratamiento,
                    materiasPostPretratamiento: stepMateriasPostPretratamiento,
                    procesosPretratamiento: stepProcesosPretratamiento,
                    materiasIniciales: stepMateriasIniciales
                }))
                setSteps(["Materias iniciales", "Procesos pretratamiento", "Materias post pretratamiento", "Procesos postratamiento", "Materias finales"])
                setActiveStep(4)

                break

            case TipoElemento.ProcesoPostratamiento:
                stepProcesosPostratamiento = [elemento.elemento as IProcesoPostratamiento]
                stepMateriasPostPretratamiento = stepProcesosPostratamiento[0].materiasPrimasEmpleadas.map(materia => materiasPostPretratamiento[materia as number])
                stepProcesosPretratamiento = stepMateriasPostPretratamiento.map(material => procesosPretratamiento[material.procesoOrigen as number])
                stepMateriasIniciales = stepProcesosPretratamiento.map(proceso => proceso.materiasPrimasEmpleadas.map(materia => materiasIniciales[materia as number])).flat()

                setStepsCotent(values => ({
                    ...values,
                    procesosPostratamiento: stepProcesosPostratamiento,
                    materiasPostPretratamiento: stepMateriasPostPretratamiento,
                    procesosPretratamiento: stepProcesosPretratamiento,
                    materiasIniciales: stepMateriasIniciales
                }))
                setSteps(["Materias iniciales", "Procesos pretratamiento", "Materias post pretratamiento", "Procesos postratamiento"])
                setActiveStep(3)

                break

            case TipoElemento.MateriaPostPretratamiento:
                stepMateriasPostPretratamiento = [elemento.elemento as IMaterialPostPretratamiento]
                stepProcesosPretratamiento = stepMateriasPostPretratamiento.map(material => procesosPretratamiento[material.procesoOrigen as number])
                stepMateriasIniciales = stepProcesosPretratamiento.map(proceso => proceso.materiasPrimasEmpleadas.map(materia => materiasIniciales[materia as number])).flat()

                setStepsCotent(values => ({
                    ...values,
                    materiasPostPretratamiento: [elemento.elemento as IMaterialPostPretratamiento],
                    procesosPretratamiento: procesosPretratamiento,
                    materiasIniciales: materiasIniciales
                }))
                setSteps(["Materias iniciales", "Procesos pretratamiento", "Materias post pretratamiento"])
                setActiveStep(2)

                break

            case TipoElemento.ProcesoPretratamiento:
                stepProcesosPretratamiento = [elemento.elemento as IProcesoPretratamiento]
                stepMateriasIniciales = stepProcesosPretratamiento[0].materiasPrimasEmpleadas.map(materia => materiasIniciales[materia as number])

                setStepsCotent(values => ({
                    ...values,
                    procesosPretratamiento: stepProcesosPretratamiento,
                    materiasIniciales: stepMateriasIniciales
                }))
                setSteps(["Materias iniciales", "Procesos pretratamiento"])
                setActiveStep(1)

                break

            case TipoElemento.MateriaInicial:
                stepMateriasIniciales = [elemento.elemento as IMaterialInicial]

                setStepsCotent(values => ({
                    ...values,
                    materiasIniciales: stepMateriasIniciales
                }))
                setSteps(["Materias iniciales"])
                setActiveStep(0)

                break
        }
    }

    return (
        <main>
            <CustomNavbar />

            <Box sx={{ width: '100%', paddingTop: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SearchBar ejecutarBusqueda={ejecutarBusqueda} />

                {elementosEncontrados && elementosEncontrados.length > 1 ? 
                    <TableContainer component={Paper} sx={{marginTop: '20px', width: '700px'}}>
                        <Table aria-label="Elementos encontrados código buscado">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Tipo elemento</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {elementosEncontrados.map((elemento, index) => (
                                    <TableRow 
                                        key={index} 
                                        sx={{cursor: 'pointer'}}
                                        hover
                                        onClick={() => getSteps(elemento)}
                                    >
                                        <TableCell>{elemento.tipoElemento}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                : null}

                <Box sx={{ paddingTop: '30px' }}>
                    <Stepper activeStep={activeStep} sx={{ marginBottom: '20px' }}>
                        {steps?.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>

                    {activeStep === 0 && stepsContent.materiasIniciales.length > 0 ? (
                        <React.Fragment>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="Tabla materias iniciales">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Codigo</b></TableCell>
                                            <TableCell><b>Proveedor</b></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {stepsContent.materiasIniciales.map((materia, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{materia.codigo}</TableCell>
                                                <TableCell>{materia.proveedor}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                    ) : null}

                    {activeStep === 1 && stepsContent.procesosPretratamiento.length > 0 ? (
                        <React.Fragment>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="Tabla procesos pretratamiento">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Codigo</b></TableCell>
                                            <TableCell><b>Procesos realizados</b></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {stepsContent.procesosPretratamiento.map((proceso, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{proceso.codigo}</TableCell>
                                                <TableCell>{proceso.procesosRealizados.join(', ')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                    ) : null}

                    {activeStep === 2 && stepsContent.materiasPostPretratamiento.length > 0 ? (
                        <React.Fragment>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="Tabla materias post pretratamiento">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Codigo</b></TableCell>
                                            <TableCell><b>Tipo</b></TableCell>
                                            <TableCell><b>Masa</b></TableCell>
                                            <TableCell><b>Pureza</b></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {stepsContent.materiasPostPretratamiento.map((materia, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{materia.codigo}</TableCell>
                                                <TableCell>{materia.tipo}</TableCell>
                                                <TableCell>{materia.masa}</TableCell>
                                                <TableCell>{materia.pureza}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                    ) : null}

                    {activeStep === 3 && stepsContent.procesosPostratamiento.length > 0 ? (
                        <React.Fragment>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="Tabla procesos postratamiento">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Codigo</b></TableCell>
                                            <TableCell><b>Procesos realizados</b></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {stepsContent.procesosPostratamiento.map((proceso, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{proceso.codigo}</TableCell>
                                                <TableCell>{proceso.procesosRealizados.join(', ')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                    ) : null}

                    {activeStep === 4 && stepsContent.materiasFinales.length > 0 ? (
                        <React.Fragment>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="Tabla materias finales">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Codigo</b></TableCell>
                                            <TableCell><b>Tipo material</b></TableCell>
                                            <TableCell><b>Masa</b></TableCell>
                                            <TableCell><b>Porcentaje substitución</b></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {stepsContent.materiasFinales.map((materia, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{materia.codigo}</TableCell>
                                                <TableCell>{materia.tipoMaterial}</TableCell>
                                                <TableCell>{materia.masa}</TableCell>
                                                <TableCell>{materia.porcentajeSubstitucion}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                    ) : null}

                    {steps && steps.length > 0 ?
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={() => setActiveStep(activeStep - 1)}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>

                            <Button
                                disabled={activeStep === (steps?.length ?? 0) - 1}
                                onClick={() => setActiveStep(activeStep + 1)}
                            >
                                Next
                            </Button>
                        </Box>
                        : null}
                </Box>
            </Box>
        </main>
    )
}

const SearchBar = ({ ejecutarBusqueda }: {
    ejecutarBusqueda: (codigo: string) => void
}) => {
    const [codigo, setCodigo] = React.useState("")

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '600px',
            maxWidth: '90%',
            marginTop: '40px'
        }}>
            <TextField
                id="search-bar"
                className="text"
                onChange={(e) => setCodigo(e.target.value)}
                label="Buscar código"
                variant="outlined"
                placeholder="Buscar..."
                style={{ flex: 1 }}
            />

            <IconButton
                type="submit"
                aria-label="search"
                onClick={() => ejecutarBusqueda(codigo)}
                style={{ marginLeft: '10px' }}
            >
                <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
        </ div>
    )
}



export default ConsultarCodigo