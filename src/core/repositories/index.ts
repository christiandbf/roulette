import Repository from './Repository';
import redisRepositoryFactory from './redis';

abstract class RepositoryManager {
	private static repository: Repository;

	static getInstance(): Repository {
		if (!this.repository) {
			this.repository = redisRepositoryFactory();
		}

		return this.repository;
	}
}

export default RepositoryManager;
