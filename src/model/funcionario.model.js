
import mongoose from 'mongoose';
import Conta from '../model/conta.model';

const funcionarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é requerido']
    },
    contratacao: {
        type: Date,
        required: [true, 'O data da contração é requerida']
    },

    celula: {
        type: String,
        required: [true, 'O data da contração é requerida'],
        default: 'Campina Grande'
    },

    cargo: {
        type: String,
        required: [true, 'O cargo é requerido']
    },
    nivel: {
        type: String,
        required: [true, 'O cargo é requerido']
    },
   
    conta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conta',
        required: true
    },

})




const Funcionario = mongoose.model('Funcionario', funcionarioSchema);


export default Funcionario; 
