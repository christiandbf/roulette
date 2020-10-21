import { strict as assert } from 'assert';
import UseCase from './UseCase';
import Bet from '../domain/BetEntity';
import Roulette from '../domain/RouletteEntity';
import { BetRequestModel, BetResponseModel } from '../models/Bet';
import BetMapper from '../mappers/Bet';

class CreateBetUseCase extends UseCase<BetRequestModel, BetResponseModel> {
	constructor() {
		super();
	}

	async execute(request: BetRequestModel): Promise<BetResponseModel> {
		const roulette: Roulette | null = await this.repository.roulette.findById(
			request.rouletteId
		);
		assert.ok(roulette, 'Roulette does not exist');
		assert.ok(roulette.getIsOpen(), 'Roulette is not open');
		const bet: Bet = BetMapper.toEntity(request);
		await this.repository.bet.create(bet);

		return BetMapper.toModel(bet);
	}
}

export default CreateBetUseCase;
