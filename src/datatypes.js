//@flow
export type Unit = {
  name: string,
  code: string,
  symbol: string,
  magnitude: number
};

export type Currency = {
  name: string,
  family: string,
  color: string,
  units: Array<Unit>
};

export type Account = *; // TODO

export type Operation = *; // TODO

export type PendingEvent =
  | { type: 'account', data: Account }
  | { type: 'operation', data: Operation };