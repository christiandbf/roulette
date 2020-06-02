import { strict as assert } from 'assert';
import Entity from './Entity';

interface Props {
  id?: string;
  rouletteId: string;
  userId: string;
  amount: number;
}

class Bet extends Entity<Props> {
  private readonly MAX_AMOUNT: number = 10000;

  private readonly rouletteId: string;
  private readonly userId: string;
  private readonly amount: number;

  constructor(props: Props) {
    super(props, props.id);
    assert.ok(props.amount < this.MAX_AMOUNT, 'Maximum bet amount exceeded');
    assert.ok(
      this.UUID_REGEXP.test(props.rouletteId),
      'User ID is not a valid UUID'
    );
    assert.ok(
      this.UUID_REGEXP.test(props.userId),
      'User ID is not a valid UUID'
    );
    this.rouletteId = props.rouletteId;
    this.userId = props.userId;
    this.amount = props.amount;
  }

  public getrouletteId(): string {
    return this.rouletteId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getAmount(): number {
    return this.amount;
  }
}

export default Bet;
