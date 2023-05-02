export default interface IProcesoPretratamiento {
    id?: number
    codigo: string
    procesosRealizados: string[]
    materiasPrimasEmpleadas: number[] | string[]
}