import IElementoMaterialInicial from "./IElementoMaterialInicial";

export default interface IMaterialInicial {
    codigo: string,
    proveedor: string,
    elementos: IElementoMaterialInicial[]
}