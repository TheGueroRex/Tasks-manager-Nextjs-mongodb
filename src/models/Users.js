import mongoose, { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido'],
        match: [
            /^\w+([\·-]?\w+)*@\w+([\·-]?\w+)*(\.\w{2,3})+$/,
            "El email no es valido"
        ]
    },
    password: {
        type: String,
        required: [true, "La contraceña es requerida"],
        select: false
    },
    fullname: {
        type: String,
        required: [true, "El nombre es requerido"],
        minLength: [3, "El nombre tiene que ser de al menos 3 caracteres"],
        maxLength: [50, "El nombre tiene que Tener menos de 50 caracteres"]
    }
});

const User = models.User || model('User', userSchema)
export default User;
