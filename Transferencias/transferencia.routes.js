import { Router } from "express"; 
import { TransferenciaController } from "./transferencia.controller.js";

const router = Router()

router.get('/', TransferenciaController.getTransferencias )
router.get('/:id', TransferenciaController.getTransferenciasById )
router.post('/', TransferenciaController.createTransferencia)

export default router