export default interface Mapper<Entity, RequestModel, ResponseModel> {
  toEntity(model: RequestModel): Entity;
  toModel(entity: Entity): ResponseModel;
}
