interface Readable<Entity> {
	find(): Promise<Entity[]>;
	findById(id: string): Promise<Entity | null>;
}

export default Readable;
