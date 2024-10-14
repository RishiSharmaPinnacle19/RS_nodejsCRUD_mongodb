const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    //username: name is unique
    username: {
        type: String,
        required: true,
        unique: true
    },
    // email  is unique and lowercase
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // validation for email
        validate: {
            validator: (v) => {
                return /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(v);
                // regular expressiom  for email, its allows alphanumeric characters, ., 
                
            },
            message: (props) => `${props.value} is not a valid email!`,
            // its show error message 
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.length >= 8; 
                // this line check pwd is >= 8 charater or not if yes its true , if not show err
            },
            message: 'Password must be at least 8 characters long'
        }
    },
    roles: {
        type: [String],
        required: true,
        default: ['user'] // Default roles value as 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
        // show currect time 
    }
});

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema); 
// export file mongoose.model('User', userSchema); 
