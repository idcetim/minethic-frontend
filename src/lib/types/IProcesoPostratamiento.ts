export default interface IProcesoPostratamiento {
    id?: number
    codigo: string
    procesosRealizados: string[]
    materiasPrimasEmpleadas: number[] | string[]
}