import Roulette from '../domain/RouletteEntity';

export default interface Notification {
	notifyRouletteOpen(roulette: Roulette): Promise<void>;
}
