import RepositoryManager from '../repositories';
import Repository from '../repositories/Repository';

abstract class UseCase<RequestModel, ResponseModel> {
	protected readonly repository: Repository;

	constructor() {
		this.repository = RepositoryManager.getInstance();
	}

	abstract execute(
		request: RequestModel
	): Promise<ResponseModel> | ResponseModel;
}

export default UseCase;
