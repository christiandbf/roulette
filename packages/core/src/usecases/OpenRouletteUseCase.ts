import { strict as assert } from 'assert';
import UseCase from './UseCase';
import Roulette from '../domain/RouletteEntity';
import { RouletteResponseModel } from '../models/Roulette';
import RouletteMapper from '../mappers/Roulette';
import Notification, {
	NotificationProtocol
} from '../services/NotificationManager';
import Repository from '../repositories/Repository';

class OpenRouletteUseCase extends UseCase<string, RouletteResponseModel> {
	constructor(repository: Repository) {
		super(repository);
	}

	async execute(id: string): Promise<RouletteResponseModel> {
		const roulette: Roulette | null = await this.repository.roulette.findById(
			id
		);
		assert.ok(roulette, 'Roulette does not exist');
		roulette.open();
		this.repository.roulette.update(roulette);
		const notification = Notification.getInstance({
			protocol: NotificationProtocol.SNS
		});
		await notification.notifyRouletteOpen(roulette);

		return RouletteMapper.toModel(roulette);
	}
}

export default OpenRouletteUseCase;
