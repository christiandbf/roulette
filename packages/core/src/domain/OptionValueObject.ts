import { strict as assert } from 'assert';
import ValueObject from './ValueObject';

interface Props {
	selection: string;
}

class OptionValueObject extends ValueObject<Props, string> {
	private readonly SELECTION_REGEX: RegExp = /^([1-9]|[12]\d|3[0-6])$|^(BLACK|RED)$/i;
	private static readonly TO_NUMBER: number = 36;
	private static readonly COLORS: [string, string] = ['BLACK', 'RED'];

	constructor(props: Props) {
		super(props, props.selection.toUpperCase());
		assert.ok(
			this.SELECTION_REGEX.test(props.selection),
			'Selection is not valid'
		);
	}

	static getRandomColorOption(): OptionValueObject {
		const random: number = Math.ceil(Math.random() * this.COLORS.length) - 1;
		return new OptionValueObject({ selection: this.COLORS[random] });
	}

	static getRandomNumberOption(): OptionValueObject {
		const random: number = Math.ceil(Math.random() * this.TO_NUMBER);
		return new OptionValueObject({ selection: random.toString() });
	}

	static getRandomOption(): OptionValueObject {
		const type: number = Math.ceil(Math.random() * 2);
		if (type === 1) return this.getRandomColorOption();
		else return this.getRandomNumberOption();
	}
}

export default OptionValueObject;
