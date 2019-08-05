import mongoose from 'mongoose'

import { TIPOSFORMULARIO } from '../constantes/tiposFormsConstates'
import Pergunta from './pergunta.model';


const formularioSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: [true, 'O tipo do formulário é requerido'],
        enum: TIPOSFORMULARIO,
        default: TIPOSFORMULARIO[0],
    },
    perguntas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pergunta',
        required: true
    }],
    descricao: {
        type: String,
    },

    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
})

formularioSchema.methods.salvarComPerguntas = async (formulario, perguntas) => {
    try {
        for (let pergunta of perguntas) {
            let perguntaObj = new Pergunta(pergunta);
            await perguntaObj.save();
            formulario.perguntas.push(perguntaObj);
        }

        Formulario.findOneAndUpdate({ 'ativo': true,  'tipo': formulario.tipo}, { 'ativo': false }, { new: true }, (err, doc) => {
            if (err) {
                throw (err);
            }

            formulario.save().then((formSalvo) => {
                return formSalvo
            }).catch((err) => {
                throw (err);
            });

        });

    } catch (err) {
        throw (err);
    }

}

const Formulario = mongoose.model('Formulario', formularioSchema);

export default Formulario;