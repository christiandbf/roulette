import UseCase from './UseCase';
import Roulette from '../domain/RouletteEntity';
import { RouletteResponseModel } from '../models/Roulette';
import RouletteMapper from '../mappers/Roulette';

class ListRouletteUseCase extends UseCase<{}, RouletteResponseModel[]> {
	constructor() {
		super();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async execute(request: {}): Promise<RouletteResponseModel[]> {
		const roulettes: Roulette[] = await this.repository.roulette.find();
		const rouletteResponseModels: RouletteResponseModel[] = roulettes.map(
			(roulette: Roulette): RouletteResponseModel =>
				RouletteMapper.toModel(roulette)
		);

		return rouletteResponseModels;
	}
}

export default ListRouletteUseCase;
