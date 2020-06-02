interface Readable<Entity> {
  find(): Promise<Entity[]>;
  findById(id: string): Promise<Array<Entity>>;
}

export default Readable;
