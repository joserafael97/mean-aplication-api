
import jwt from 'jsonwebtoken'
import Conta from '../src/model/conta.model';

module.exports = autorizacao;


function autorizacao(papeis = []) {
    if (typeof papeis === 'string') {
        papeis = [papeis];
    }

    return [
        (req, res, next) => {
            const token = req.header('Authorization'); if (!token) return res.status(401).send('Acesso negado: Não existe token!');
            try {
                const decoded = jwt.verify(token, global.gConfig.secret_key);
                if (papeis.length !== 0) {
                    Conta.findById(decoded.contaId).then((conta) => {
                        if (papeis.length && !papeis.includes(conta.papel)) {
                            return res.status(401).json({ message: 'Você não tem permissão de acesso a este recurso.' });
                        } else {
                            next();
                        }

                    });
                } else
                    next();
            } catch (ex) {
                res.status(401).send('Token inválido')
            }
        }
    ];
}


// import { verifyJWTToken } from './lib/auth'

// export function verifyJWT_MW(req, res, next)
// {
//   let token = req.header('x-auth-header'); if (!token) return res.status(401).send('Acesso negado: Não existe token!');

//   verifyJWTToken(token)
//     .then((decodedToken) =>
//     {
//       req.user = decodedToken.data
//       next()
//     })
//     .catch((err) =>
//     {
//       res.status(400)
//         .json({message: "Token inválido."})
//     })
// }