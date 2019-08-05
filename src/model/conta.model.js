import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Papel from '../constantes/tiposUsuario'


let contaSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A número da matrícula é requerido'],
        unique: [true, 'Matrícula já cadastrada'],
    },

    senha: {
        type: String,
        required: [true, 'A senha é requerido'],
    },

    papel: {
        type: String,
        required: [true, 'O papel da conta é requerido'],
        enum: Papel.todosTiposUsuarios,
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
});


contaSchema.pre('save', function (next) {
    let conta = this;
    if (!conta.isModified('senha')) { return next() };
    bcrypt.hash(conta.senha, 10).then((senhaHashed) => {
        conta.senha = senhaHashed;
        next();
    })
}, function (err) {
    next(err)
});


contaSchema.methods.comparePassword = function (senhaUser, next) {
    bcrypt.compare(senhaUser, this.senha, function (err, isValida) {
        if (err) return next(err);
        next(null, isValida)
    })
}


const Conta = mongoose.model('Conta', contaSchema);

export default Conta; 