import { BigInt } from '@graphprotocol/graph-ts';
import {
  Contract,
  Deposit,
  EmergencyWithdraw,
  OwnershipTransferred,
  Withdraw,
} from '../generated/Contract/Contract';
import { User } from '../generated/schema';
import { loadHistory } from './helpers/loadHistory';
import { loadTotalStake } from './helpers/loadTotalStake';
import { loadUser } from './helpers/loadUer';

export function handleDeposit(event: Deposit): void {
  const user = loadUser(event.transaction.from.toHex());
  const totalStake = loadTotalStake('totalStake');
  const history = loadHistory(event.transaction.hash.toHex());

  let userExisted = false;
  for (let i = 0; i < totalStake.users.length; ++i) {
    if (totalStake.users[i] === event.transaction.from.toHex()) {
      userExisted = true;
    }
  }
  if (!userExisted) {
    const users = totalStake.users;
    users.push(user.id);
    totalStake.users = users;
    totalStake.userCount = totalStake.userCount + 1;
  }
  totalStake.amount = totalStake.amount.plus(event.params.amount);
  totalStake.save();
  // add to histories
  history.action = 'Deposit';
  history.date = event.block.timestamp.toI32();
  history.amount = event.params.amount;
  history.user = user.id
  history.save();
  const userHistories = user.histories;
  userHistories.push(history.id);
  user.histories = userHistories;
  user.historiesCount = user.historiesCount + 1
  user.save();
}

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {
  const user = loadUser(event.transaction.from.toHex());
  const totalStake = loadTotalStake('totalStake');
  const history = loadHistory(event.transaction.hash.toHex());
  // calculate total Staked
  let userExisted = false;
  for (let i = 0; i < totalStake.users.length; ++i) {
    if (totalStake.users[i] === event.transaction.from.toHex()) {
      userExisted = true;
    }
  }
  if (!userExisted) {
    const users = totalStake.users;
    users.push(user.id);
    totalStake.users = users;
    totalStake.userCount = totalStake.userCount + 1;
  }
  totalStake.amount = totalStake.amount.minus(event.params.amount);
  totalStake.save();
  // add to histories
  history.action = 'EmergencyWithdraw';
  history.date = event.block.timestamp.toI32();
  history.amount = event.params.amount;
  history.user = user.id
  history.save();
  const userHistories = user.histories;
  userHistories.push(history.id);
  user.histories = userHistories;
  user.historiesCount = user.historiesCount + 1
  user.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleWithdraw(event: Withdraw): void {
  const user = loadUser(event.transaction.from.toHex());
  const totalStake = loadTotalStake('totalStake');
  const history = loadHistory(event.transaction.hash.toHex());
  // calculate total Staked
  let userExisted = false;
  for (let i = 0; i < totalStake.users.length; ++i) {
    if (totalStake.users[i] === event.transaction.from.toHex()) {
      userExisted = true;
    }
  }
  if (!userExisted) {
    const users = totalStake.users;
    users.push(user.id);
    totalStake.users = users;
    totalStake.userCount = totalStake.userCount + 1;
  }
  totalStake.amount = totalStake.amount.minus(event.params.amount);
  totalStake.save();
  // add to histories
  history.action = 'Withdraw';
  history.date = event.block.timestamp.toI32();
  history.amount = event.params.amount;
  history.user = user.id
  history.save();
  const userHistories = user.histories;
  userHistories.push(history.id);
  user.histories = userHistories;
  user.historiesCount = user.historiesCount + 1
  user.save();
}
