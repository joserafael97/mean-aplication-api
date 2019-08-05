
import mongoose from 'mongoose'
import StatusAvaliacao from '../constantes/statusAvaliacao'
import { TIPOSFORMULARIO } from '../constantes/tiposFormsConstates'
import Pergunta from '../model/pergunta.model';
import Resposta from '../model/resposta.model';

const AvaliacaoSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: [true, 'A descrição da avaliação é requerida'],
        enum: TIPOSFORMULARIO,
        default: TIPOSFORMULARIO[0],
    },

    status: {
        type: String,
        required: [true, 'O status da avaliação é requerido'],
        enum: StatusAvaliacao.todosTiposUsuarios,
        default: StatusAvaliacao.iniciada
    },
    data: {
        type: Date,
        required: [true, 'A data da avaliação é requerida']
    },

    dataFim: {
        type: Date,
    },

    respostas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resposta',
        required: true
    }],

    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario',
        require: [true, 'O dono da avaliação é requerido']
    },

    mentorResponsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario',
    },

    bpResponsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario',
        default: null
    },

    gerenteResponsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario',
        default: null
    },

})

const Avaliacao = mongoose.model('Avaliacao', AvaliacaoSchema);


export default Avaliacao;