import Repository from '../repositories/Repository';

abstract class UseCase<RequestModel, ResponseModel> {
	constructor(protected readonly repository: Repository) {}

	abstract execute(
		request: RequestModel
	): Promise<ResponseModel> | ResponseModel;
}

export default UseCase;
