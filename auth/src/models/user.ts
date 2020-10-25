import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Password } from '../tools/password';
import { UserInfo } from './entities/userEntity';

interface UserDoc extends mongoose.Document, UserInfo {}

interface UserModel extends mongoose.Model<UserDoc> {
  build(userInfo: UserInfo): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.get('password'), salt);
    // const hashedPass = await Password.hash(this.get('password'));
    this.set('password', hashedPass);
  }
  done();
});

userSchema.statics.build = (attrs: UserInfo) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
