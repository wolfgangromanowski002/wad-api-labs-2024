import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Password validation regex
const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return passwordValidator.test(v);
            },
            message: props => `${props.value} is not a valid password! Password must be at least 8 characters long, include one letter, one number, and one special character.`
        }
    }
});

export default mongoose.model('User', UserSchema);
