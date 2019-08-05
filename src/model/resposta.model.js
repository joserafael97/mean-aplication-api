import mongoose from 'mongoose'
import Pergunta from '../model/pergunta.model';

const RespostaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: [true, 'A resposta é requerida'],
    },
    data: {
        type: Date,
        required: true
    },
    pergunta: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pergunta',
        required: true
    },

    funcionario:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Funcionario',
        require: [true, 'O autor da resposta é requerido']
    },
})

const Resposta = mongoose.model('Resposta', RespostaSchema);


export default Resposta;