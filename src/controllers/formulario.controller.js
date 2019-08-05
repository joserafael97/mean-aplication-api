import Formulario from '../model/formulario.model'

module.exports = {

    /**
     * Adicionar novo Funcionário
     * @property {string} req.body.tipo - Tipo do formulário.
     * @property {string} req.body.perguntas - lista de perguntasS.
     * @returns {Formulario}
     */
    adicionar: async (req, res, next) => {
        try {
            const perguntas = req.body.perguntas;

            delete req.body.perguntas;
            let formulario = new Formulario(req.body)

            formulario.salvarComPerguntas(formulario, perguntas).then((formulario) => {

                res.status(201).json({ formulario })

            }).catch((erro) => {
                res.status(400).send({ message: erro })
            });
        } catch (e) {
            res.status(400).send({
                message: e
            })
        }
    },


    /**
     * Lista todos os modelos de formulários.
     * @returns {Formulario[]}
     */
    listaFormularios: async (req, res, next) => {
        try {
            res.json((await Formulario.find({})));
        } catch (e) {
            res.status(400).send({
                message: e
            })
        }
    },

    /**
    * Remove modelo formulário.
    * @returns {Formulario}
    */
    removerFormulario: async (req, res, next) => {
        try {
            Formulario.findOne({ '_id': req.params.id }).then((formulario) => {
                if (formulario.ativo === true) {
                    res.status(400).send({
                        message: 'O modelo não pode ser removido. Ele está atualmente em uso'
                    })
                } else {
                    Formulario.findByIdAndRemove({ '_id': req.params.id }).then((result) => {
                        res.status(200).send({
                            message: 'O modelo foi removido com sucesso.'
                        })
                    }).catch((err) => {
                        res.status(400).send({
                            message: e
                        })
                    })

                }
            });
        } catch (e) {
            res.status(400).send({
                message: e
            })
        }
    }

};