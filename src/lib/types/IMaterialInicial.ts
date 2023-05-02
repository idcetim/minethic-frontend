import IElementoMaterialInicial from "./IElementoMaterialInicial";

export default interface IMaterialInicial {
    id?: number
    codigo: string,
    proveedor: string,
    elementos: IElementoMaterialInicial[]
}