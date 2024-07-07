import { Router } from "express"; 
import { CuentaController } from "./cuenta.controller.js";

const router = Router()

router.get('/', CuentaController.getCuentas)
router.get('/:id', CuentaController.getSaldo)
router.post('/', CuentaController.update)

export default router