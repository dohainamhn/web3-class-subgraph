import { History } from '../../generated/schema';

export const loadHistory = (id: string): History => {
  let history = History.load(id);
  if (!history) {
    history = new History(id);
    history.save();
  }
  return history;
};
