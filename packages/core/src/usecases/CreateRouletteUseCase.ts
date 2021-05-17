import UseCase from './UseCase';
import {
	RouletteRequestModel,
	RouletteResponseModel
} from '../models/Roulette';
import RouletteMapper from '../mappers/Roulette';
import Repository from '../repositories/Repository';

class CreateRouletteUseCase extends UseCase<
	RouletteRequestModel,
	RouletteResponseModel
> {
	constructor(repository: Repository) {
		super(repository);
	}

	async execute(request: RouletteRequestModel): Promise<RouletteResponseModel> {
		const roulette = RouletteMapper.toEntity(request);
		await this.repository.roulette.create(roulette);

		return RouletteMapper.toModel(roulette);
	}
}

export default CreateRouletteUseCase;
