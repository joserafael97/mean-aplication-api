import express from 'express'
import AvaliacaoCtrl from '../controllers/avaliacao.controller'
import autorizacao from '../../middlewares/autorizacao'
import Papel from '../constantes/tiposUsuario'

const router = express.Router();

router.get('/', autorizacao([Papel.gerente, Papel.bp]), AvaliacaoCtrl.todasAvaliacoes)
router.get('/:id', autorizacao(), AvaliacaoCtrl.BuscaAvaliacoesByFuncionarioId)

module.exports = router;