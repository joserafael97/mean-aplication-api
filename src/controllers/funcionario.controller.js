import Funcionario from '../model/funcionario.model'
import Conta from '../model/conta.model';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import Avaliacao from '../model/avaliacao.model';


module.exports = {

    /**
     * Adicionar novo Funcionário
     * @property {string} req.body.nome - Nome do funcionário.
     * @property {string} req.body.contratacao - A data da contratação.
     * @property {string} req.body.cargo - O cargo do funcionário.
     * @property {string} req.body.tipo - O tipo de usuário o funcionário será no sistema.
     * @property {string} req.body.conta.username - A matrícula do conta do funcionário.
     * @property {string} req.body.conta.senha - A senha de acesso a conta do funcionário.
     * @property {string} req.body.conta.papel - O papel do funcionário.
     * @property {string} req.body.avaliacoes - As avalicoes do funcionário.
     * @returns {Funcionario}
     */
    adicionar: async (req, res, next) => {
        try {
            new Conta(req.body.conta).save().then((conta) => {
                delete req.body.conta;
                let funcionario = new Funcionario(req.body);

                funcionario.conta = conta;

                funcionario.save().then((funcionario) => {
                    const token = jwt.sign({ contaId: conta.id, papel: conta.papel }, global.gConfig.secret_key);
                    res.status(201).json({
                        contaId: funcionario.conta.id,
                        username: funcionario.conta.username,
                        papel: funcionario.conta.papel,
                        token: token
                    })

                }).catch((erro) => {
                    res.status(400).send({ message: erro })
                });

            }).catch((erro) => {
                res.status(400).send({ message: erro })
            });

        } catch (e) {
            res.status(400).send({
                message: e.errmsg
            })
        }
    },


    /**
     * Lista todos os funcionários.
     * @returns {Funcionario[]}
     */
    listaFuncionarios: async (req, res, next) => {
        try {
            res.json((await Funcionario.find({})))
        } catch (e) {
            res.status(400).send({
                message: e
            })
        }
    },

    /**
     * Busca funcionário pelo id de sua conta
     * @returns {Funcionario[]}
     */
    buscaFuncionarioByIdConta: async (req, res, next) => {
        Funcionario.findOne({ 'conta': new mongoose.Types.ObjectId(req.params.id) }).populate({path: 'conta'}).exec((err, funcionario) => {

            if (err) {
                res.status(400).send({
                    message: err
                })
            }
            funcionario.conta.senha = '';
            res.json(funcionario);
        })

    }

};


