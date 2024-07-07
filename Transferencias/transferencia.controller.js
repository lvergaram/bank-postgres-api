import { TransferenciaModel } from './transferencia.model.js'

const getTransferencias = async(req, res) => {
  try {
    const response = await TransferenciaModel.getTransferencias()
    return res.json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ok:false})
  }
}

const getTransferenciasById = async(req, res) => {
  try {
    const {id} = req.params
    const response = await TransferenciaModel.getTransferenciasById(id)
    return res.json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ok:false,msg:'problem'})
  }
}


const createTransferencia = async(req, res) => {
  try {
    const newTransferencia = req.body
    console.log(req.body)
    const response = await TransferenciaModel.create(newTransferencia)
    console.log(await getTransferencias[0])
    return res.json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ok:false})
  }
}

export const TransferenciaController = {
  getTransferencias,
  getTransferenciasById,
  createTransferencia

}