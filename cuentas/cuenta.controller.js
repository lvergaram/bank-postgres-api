import { CuentaModel } from "./cuenta.model.js"; 

const getCuentas = async (req, res) => {
  try {
    const response = await CuentaModel.getCuentas()
    return res.json(response)
  } catch (error) {
    res.status(500).json({ok:false})
  }
}

const getSaldo = async(req, res) => {
  try {
    const {id} = req.params
    const response = await CuentaModel.getSaldoCuenta(id)
    return res.json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ok:false})
  }
}

const update = async(req,res) => {
  try {
    const {id,monto} = req.body 
    const response = await CuentaModel.update(id, monto)
    return res.json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ok:false})
  }
}

export const CuentaController = {
  getCuentas,
  getSaldo,
  update
}