import express from 'express'
import FormularioCtrl from '../controllers/formulario.controller'
import autorizacao from '../../middlewares/autorizacao'
import Papel from '../constantes/tiposUsuario'

const router = express.Router();

router.post('/',  autorizacao([Papel.gerente, Papel.bp]), FormularioCtrl.adicionar)

router.get('/', autorizacao([Papel.gerente, Papel.bp]), FormularioCtrl.listaFormularios)
 
router.delete('/:id', autorizacao([Papel.gerente, Papel.bp]), FormularioCtrl.removerFormulario)

module.exports = router;