import { BigInt } from '@graphprotocol/graph-ts';
import { TotalStaked, User } from '../../generated/schema';

export const loadTotalStake = (id: string): TotalStaked => {
  let totalStake = TotalStaked.load(id);
  if (!totalStake) {
    totalStake = new TotalStaked(id);
    totalStake.amount = BigInt.fromString("0"),
    totalStake.userCount = 0;
    totalStake.users = new Array<string>();
    totalStake.save();
  }
  return totalStake;
};
