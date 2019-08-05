import express from 'express'
import FuncionarioCtrl from '../controllers/funcionario.controller'
import autorizacao from '../../middlewares/autorizacao'
import Papel from '../constantes/tiposUsuario'

const router = express.Router();

router.post('/',  FuncionarioCtrl.adicionar)

router.get('/', autorizacao([Papel.gerente, Papel.bp]), FuncionarioCtrl.listaFuncionarios)

router.get('/:id', autorizacao(), FuncionarioCtrl.buscaFuncionarioByIdConta)

module.exports = router;
