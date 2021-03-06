import { shallowEqual } from 'shallow-equal-object';

abstract class ValueObject<Props, Value> {
	protected readonly props: Props;
	public readonly value: Value;

	constructor(props: Props, value: Value) {
		this.props = Object.freeze(props);
		this.value = value;
	}

	public getProps(): Props {
		return this.props;
	}

	public equals(vo?: ValueObject<Props, Value>): boolean {
		if (vo === null || vo === undefined) return false;
		if (vo.props === undefined) return false;

		return shallowEqual(this.props, vo.props);
	}
}

export default ValueObject;
