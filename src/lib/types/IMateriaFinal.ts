export default interface IMaterialFinal {
    id?: number
    codigo: string
    tipoMaterial: string
    masa: string
    porcentajeSubstitucion: string
    procesoOrigen: number | undefined
}