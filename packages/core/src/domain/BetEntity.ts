import { strict as assert } from 'assert';
import Entity from './Entity';
import Option from './OptionValueObject';

interface Props {
	id?: string;
	option: Option;
	rouletteId: string;
	userId: string;
	amount: number;
}

class Bet extends Entity<Props> {
	private readonly MAX_AMOUNT: number = 10000;

	private readonly rouletteId: string;
	private readonly userId: string;
	private readonly amount: number;
	private readonly option: Option;

	constructor(props: Props) {
		super(props, props.id);
		assert.ok(props.amount < this.MAX_AMOUNT, 'Maximum bet amount exceeded');
		assert.ok(
			this.UUID_REGEXP.test(props.rouletteId),
			'Roulette ID is not a valid UUID'
		);
		assert.ok(
			this.UUID_REGEXP.test(props.userId),
			'User ID is not a valid UUID'
		);
		this.option = props.option;
		this.rouletteId = props.rouletteId;
		this.userId = props.userId;
		this.amount = props.amount;
	}

	public getRouletteId(): string {
		return this.rouletteId;
	}

	public getUserId(): string {
		return this.userId;
	}

	public getAmount(): number {
		return this.amount;
	}

	public getOption(): Option {
		return this.option;
	}
}

export default Bet;
