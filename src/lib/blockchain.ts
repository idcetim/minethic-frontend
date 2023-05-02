import {ethers} from 'ethers'
import IMaterialInicial from './types/IMaterialInicial'
import IMaterialPostPretratamiento from './types/IMaterialPostPretratamiento'
import IMateriaFinal from './types/IMateriaFinal'
import IMaterialFinal from './types/IMateriaFinal'
import IProcesoPostratamiento from './types/IProcesoPostratamiento'
import IProcesoPretratamiento from './types/IProcesoPretratamiento'

const wallet = ethers.Wallet.fromMnemonic(process.env.NEXT_PUBLIC_MNEMONIC as string)
const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC)
const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string, JSON.parse(process.env.NEXT_PUBLIC_ABI as string), provider)
const walletSigner = wallet.connect(provider)
const contractWithSigner = contract.connect(walletSigner)

const addMMPPInicial = async(material: IMaterialInicial) => {
    const parameters = [
        [
            material.codigo,
            material.proveedor
        ],
        material.elementos.map(element => [element.nombre, element.masa, element.porcentaje])
    ]

    console.log(parameters)

    let tx = await contractWithSigner.addMateriaPrimaInicial(parameters[0], parameters[1], {
        gasLimit: "2000000"
    })

    console.log(tx)
}

const addMMPPPostPretratamiento = async(material: IMaterialPostPretratamiento) => {
    await contractWithSigner.addMateriaPrimaPostPretratamiento([
        material.codigo,
        material.tipo,
        material.procesoOrigen,
        material.masa,
        material.pureza
    ], {
        gasLimit: "2000000"
    })
}

const addMMPPFinal = async(mmpp: IMateriaFinal) => {
    const parameters = [
        mmpp.codigo,
        mmpp.tipoMaterial,
        mmpp.masa,
        mmpp.porcentajeSubstitucion,
        mmpp.procesoOrigen
    ]

    await contractWithSigner.addMateriaPrimaFinal(parameters, {
        gasLimit: "2000000"
    })
}

const addProcesoPretratamiento = async(proceso: IProcesoPretratamiento) => {
    const parameters = [
        proceso.codigo,
        proceso.procesosRealizados,
        proceso.materiasPrimasEmpleadas
    ]

    await contractWithSigner.addPretratamiento(parameters, {
        gasLimit: "2000000"
    })
}

const addProcesoPostratamiento = async(proceso: IProcesoPostratamiento) => {
    const parameters = [
        proceso.codigo,
        proceso.procesosRealizados,
        proceso.materiasPrimasEmpleadas
    ]

    await contractWithSigner.addPostratamiento(parameters, {
        gasLimit: "2000000"
    })
}

const getMMPPIniciales = async() => {
    let materias = await contractWithSigner.getMateriasPrimasIniciales()
    let elementos = await contractWithSigner.getElementosMateriasPrimasIniciales()

    let result = [] as IMaterialInicial[]

    for (let i = 0; i < materias.length; i++) {
        result.push({
            id: i,
            codigo: materias[i].codigo,
            proveedor: materias[i].proveedor,
            elementos: elementos[i]
        })
    }

    return result
}

const getMMPPPostPretratamiento = async() => {
    const materias = await contractWithSigner.getMateriasPrimasPostPretratamiento() as IMaterialPostPretratamiento[]
    const result = [] as IMaterialPostPretratamiento[]

    for (let i = 0; i < materias.length; i++) {
        result.push({...materias[i]})
        result[i].id = i
    }

    return result
}

const getMMPPFinales = async() => {
    const materias = await contractWithSigner.getMateriasPrimasFinales() as IMaterialFinal[]
    const result = [] as IMateriaFinal[]

    for (let i = 0; i < materias.length; i++) {
        result.push({...materias[i]})
        result[i].id = i
    }

    return result
}

const getProcesosPretratamiento = async() => {
    const procesos = await contractWithSigner.getProcesosPretratamiento() as IProcesoPretratamiento[]
    const result = [] as IProcesoPretratamiento[]

    for (let i = 0; i < procesos.length; i++) {
        result.push({...procesos[i]})
        result[i].id = i
    }

    return result
}

const getProcesosPostratamiento = async() => {
    const procesos = await contractWithSigner.getProcesosPostratamiento() as IProcesoPostratamiento[]
    const result = [] as IProcesoPostratamiento[]

    for (let i = 0; i < procesos.length; i++) {
        result.push({...procesos[i]})
        result[i].id = i
    }

    return result
}

export {
    addMMPPInicial,
    addMMPPPostPretratamiento,
    addMMPPFinal,
    addProcesoPretratamiento,
    addProcesoPostratamiento,
    getMMPPIniciales,
    getMMPPPostPretratamiento,
    getMMPPFinales,
    getProcesosPretratamiento,
    getProcesosPostratamiento
}