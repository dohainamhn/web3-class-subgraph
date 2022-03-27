import { User } from '../../generated/schema';

export const loadUser = (id: string): User => {
  let user = User.load(id);
  if (!user) {
    user = new User(id);
    user.historiesCount = 0;
    user.save();
  }
  return user;
};
