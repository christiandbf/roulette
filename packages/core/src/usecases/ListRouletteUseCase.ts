import UseCase from './UseCase';
import Roulette from '../domain/RouletteEntity';
import { RouletteResponseModel } from '../models/Roulette';
import RouletteMapper from '../mappers/Roulette';
import Repository from '../repositories/Repository';

class ListRouletteUseCase extends UseCase<void, RouletteResponseModel[]> {
	constructor(repository: Repository) {
		super(repository);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async execute(request: void): Promise<RouletteResponseModel[]> {
		const roulettes: Roulette[] = await this.repository.roulette.find();
		return roulettes.map(
			(roulette: Roulette): RouletteResponseModel =>
				RouletteMapper.toModel(roulette)
		);
	}
}

export default ListRouletteUseCase;
