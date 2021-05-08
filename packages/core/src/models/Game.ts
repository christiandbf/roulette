import { RouletteResponseModel } from './Roulette';
import { BetResponseModel } from './Bet';

export interface GameResponseModel {
	result: string;
	roulette: RouletteResponseModel;
	betWinners: Array<BetResponseModel>;
	betLosers: Array<BetResponseModel>;
}
