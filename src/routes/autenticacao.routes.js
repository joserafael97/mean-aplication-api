import express from 'express'
import AutenticacaoCtrl from '../controllers/autenticao.controller'

const router = express.Router();


router.post('/login', AutenticacaoCtrl.login)

module.exports = router;