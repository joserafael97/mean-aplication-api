
import mongoose from 'mongoose'

const PerguntaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: [true, 'A descricao é requerida'],
    },
    data: {
        type: Date,
        required: true,
        default: new Date()
    },

})

const Pergunta = mongoose.model('Pergunta', PerguntaSchema);


export default Pergunta;