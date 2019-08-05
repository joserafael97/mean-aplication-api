import Avaliacao from '../model/avaliacao.model';
import mongoose from 'mongoose';
import Funcionario from '../model/funcionario.model';
import Resposta from '../model/resposta.model';


module.exports = {

    /**
     * .
     * @returns {Avaliacao[]}
     */
    todasAvaliacoes: async (req, res, next) => {
        Avaliacao.find({})
            .populate({
                path: 'funcionario',
            })
            .populate({
                path: 'respostas',
                populate: {
                    path: 'pergunta',
                    model: 'Pergunta'
                }
            }).exec((err, avaliacoes) => {
                if (err) {
                    res.status(400).send({
                        message: err
                    })
                }


                res.json(avaliacoes);


            });
    },

    /**
     * .
     * @returns {Avaliacao[]}
     */
    BuscaAvaliacoesByFuncionarioId: async (req, res, next) => {
        Avaliacao.find({ 'funcionario': new mongoose.Types.ObjectId(req.params.id) })
            .populate({
                path: 'funcionario',
            })
            .populate({
                path: 'respostas',
                populate: {
                    path: 'pergunta',
                    model: 'Pergunta'
                }
            }).exec((err, avaliacoes) => {
                if (err) {
                    res.status(400).send({
                        message: err
                    })
                }

                if (avaliacoes.length === 0) {
                    Funcionario.findOne({ '_id': new mongoose.Types.ObjectId(req.params.id) }).then((funcionario) => {
                        let avaliacao = new Avaliacao();
                        avaliacao.data = funcionario.contratacao.setMonth(funcionario.contratacao.getMonth() + 5);
                        avaliacao.funcionario = funcionario;
                        avaliacao.save().then((avaliacao) => {
                            res.json([avaliacao]);

                        }).catch((e) => {
                            res.status(400).send({
                                message: e
                            })
                        });
                    }).catch((e) => {
                        res.status(400).send({
                            message: e
                        })
                    });

                } else {
                    res.json(avaliacoes);
                }

            });

    },



}