import { ddbb } from "../DATABASE/connection.ddbb.js";
import { CuentaModel } from "../cuentas/cuenta.model.js"

const getTransferencias = async() => {

  const text = 
    `
      SELECT * FROM transferencias
      ORDER BY FECHA DESC
    `
 
  const {rows:response} = await ddbb.query(text)
  return response

} 

const getTransferenciasById = async(id) => {

  const query ={ 
    text: 
    `
      SELECT * FROM transferencias
      WHERE cuenta_origen = $1
      or cuenta_destino = $1
      ORDER BY FECHA DESC
      LIMIT 10
    `,
    values: [id]
  }
 
  const {rows:response} = await ddbb.query(query)
  return response

} 

const create = async ( transferencia ) => {

  try {
    const {descripcion,monto,cuentaOrigen,cuentaDestino} = transferencia
    await ddbb.query('BEGIN') 
    await CuentaModel.update(cuentaOrigen, -monto)
    await CuentaModel.update(cuentaDestino, monto)

    const text = 
    ` 
      INSERT INTO TRANSFERENCIAS
      (descripcion,monto,cuenta_origen,cuenta_destino) 
      VALUES
      ($1,$2,$3,$4)
      RETURNING *
    `
    const values = [descripcion,monto,cuentaOrigen,cuentaDestino]
 
    const {rows:response} = await ddbb.query(text,values)

    await ddbb.query('COMMIT') 
    return response[0]
  } catch (error) {
    await ddbb.query('ROLLBACK')
    console.log(error)
    throw error
  }

}


export const TransferenciaModel = {
  getTransferencias,
  create,
  getTransferenciasById
}