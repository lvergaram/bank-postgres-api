import { ddbb } from "../DATABASE/connection.ddbb.js";

const getCuentas = async() => {
  const {rows:response} = await ddbb.query('SELECT * FROM CUENTAS')
  return response

}

const getSaldoCuenta = async(cuentaId) => {

  const text = 
    `
      SELECT saldo FROM cuentas
      WHERE id = $1
    `
  const values = [cuentaId]
 
  const {rows:response} = await ddbb.query(text, values)
  return response[0]

} 

const update = async(id,monto) => {

  const query = {
    text: `
      UPDATE CUENTAS
      SET SALDO = SALDO + $2
      WHERE ID = $1
      RETURNING *
    `,
    values: [id, monto]
  }

  const {rows:response} = await ddbb.query(query)
  return response[0]

}


export const CuentaModel = {
  getCuentas,
  getSaldoCuenta,
  update

}