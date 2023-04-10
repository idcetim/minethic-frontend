import {ethers} from 'ethers'
import IMaterialInicial from './types/IMaterialInicial'
import IMaterialPostPretratamiento from './types/IMaterialPostPretratamiento'
import IMateriaFinal from './types/IMateriaFinal'

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

    await contractWithSigner.addMateriaPrimaInicial(parameters[0], parameters[1], {
        gasLimit: "2000000"
    })
}

const addMMPPPostPretratamiento = async(material: IMaterialPostPretratamiento) => {
    await contractWithSigner.addMateriaPostPretratamiento([
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
    await contractWithSigner.addMateriaPrimaFinal([
        mmpp.codigo,
        mmpp.tipoMaterial,
        mmpp.masa,
        mmpp.porcentajeSubstitucion,
        mmpp.procesoOrigen
    ], {
        gasLimit: "2000000"
    })
}

export {
    addMMPPInicial,
    addMMPPPostPretratamiento,
    addMMPPFinal
}