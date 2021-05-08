import { strict as assert } from 'assert';
import Entity from './Entity';

interface Props {
	id?: string;
	isOpen?: boolean;
	name: string;
}

class Roulette extends Entity<Props> {
	private readonly MIN_CHARACTERS = 2;

	private readonly name: string;
	private isOpen: boolean;

	constructor(props: Props) {
		super(props, props.id);
		assert.ok(props.name.length > this.MIN_CHARACTERS, 'Name is not valid');
		this.name = props.name
			.toLowerCase()
			.split(' ')
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ');
		this.isOpen = props.isOpen || false;
	}

	public getName(): string {
		return this.name;
	}

	public getIsOpen(): boolean {
		return this.isOpen;
	}

	public open(): void {
		assert.ok(!this.isOpen, 'This Roulette is already open');
		this.isOpen = true;
	}

	public close(): void {
		assert.ok(this.isOpen, 'This Roulette is already close');
		this.isOpen = false;
	}
}

export default Roulette;
