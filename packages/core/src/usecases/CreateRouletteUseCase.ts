import UseCase from './UseCase';
import {
	RouletteRequestModel,
	RouletteResponseModel
} from '../models/Roulette';
import RouletteMapper from '../mappers/Roulette';

class CreateRouletteUseCase extends UseCase<
	RouletteRequestModel,
	RouletteResponseModel
> {
	constructor() {
		super();
	}

	async execute(request: RouletteRequestModel): Promise<RouletteResponseModel> {
		const roulette = RouletteMapper.toEntity(request);
		await this.repository.roulette.create(roulette);

		return RouletteMapper.toModel(roulette);
	}
}

export default CreateRouletteUseCase;
