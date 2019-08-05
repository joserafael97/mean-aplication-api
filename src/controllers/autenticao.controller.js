
import Conta from '../model/conta.model';
import jwt from 'jsonwebtoken'


module.exports = {



  /**
   * Fazer login.
   * @returns {token}
   */
  login: function (req, res) {
    Conta.findOne({ username: req.body.username }).then((conta) => {
      conta.comparePassword(req.body.senha, (err, isValido) => {
        if (isValido) {
          let token = jwt.sign({ contaId: conta.id }, global.gConfig.secret_key);
          res.status(200).json({
            contaId: conta.id,
            username: conta.username,
            papel: conta.papel,
            token: token
          })
        }
        else {
          res.status(400).json({ message: 'Username ou senha Inválida' });
        }
      })
    }).catch((err) => {
      res.status(400).json({ message: 'Username ou senha Inválida' });
    })

  }

}

