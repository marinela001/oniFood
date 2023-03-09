import {Schema, model} from 'mongoose';

export interface User{
    id:string;
    email:string;
    password: string;
    username:string;
    address:string;
    isAdmin:boolean;
    refreshToken:string;
}

export const UserSchema = new Schema<User>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    refreshToken:{type:String}
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UserModel = model<User>('user', UserSchema);