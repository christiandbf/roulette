/* eslint-disable @typescript-eslint/no-unused-vars */
import { strict as assert } from 'assert';
import { Redis } from 'ioredis';
import RepositoryRedis from './RepositoryRedis';
import { BetRepository } from '../Repository';
import Bet from '../../domain/BetEntity';
import Option from '../../domain/OptionValueObject';

interface BetDTO {
	id: string;
	selection: string;
	rouletteId: string;
	userId: string;
	amount: number;
}

class BetRepositoryRedis
	extends RepositoryRedis<Bet, BetDTO>
	implements BetRepository {
	private readonly BASE_BET: string = `${this.BASE_NAMESPACE}:BET`;

	constructor(redis: Redis) {
		super(redis);
	}

	async create(bet: Bet): Promise<void> {
		assert.ok(bet, 'Bet object is not defined');
		const betDTO: BetDTO = this.toPersistence(bet);
		await this.redis.set(
			`${this.BASE_BET}:${betDTO.id}`,
			JSON.stringify(betDTO)
		);
		await this.redis.sadd(`${this.BASE_BET}:${betDTO.rouletteId}`, betDTO.id);
	}

	async update(bet: Bet): Promise<void> {
		await this.create(bet);
	}

	find(): Promise<Bet[]> {
		throw new Error('Method not implemented.');
	}

	async findByRouletteId(id: string): Promise<Bet[]> {
		assert.ok(id, 'Roulette ID is not defined');
		const betIds: Array<string> = await this.redis.smembers(
			`${this.BASE_BET}:${id}`
		);
		const bets: Array<Bet | null> = await Promise.all(
			betIds.map((id) => this.findById(id))
		);

		return bets.filter((bet): bet is Bet => bet !== null);
	}

	async findById(id: string): Promise<Bet | null> {
		assert.ok(id, 'ID is not defined');
		const serializedBet: string | null = await this.redis.get(
			`${this.BASE_BET}:${id}`
		);
		if (!serializedBet) return null;
		const betDTO: BetDTO = JSON.parse(serializedBet);

		return this.toDomain(betDTO);
	}

	protected toDomain(betDTO: BetDTO): Bet {
		const option: Option = new Option({ selection: betDTO.selection });

		return new Bet({
			id: betDTO.id,
			option: option,
			rouletteId: betDTO.rouletteId,
			userId: betDTO.userId,
			amount: betDTO.amount
		});
	}

	protected toPersistence(bet: Bet): BetDTO {
		return {
			id: bet.getId(),
			selection: bet.getOption().value,
			rouletteId: bet.getRouletteId(),
			userId: bet.getUserId(),
			amount: bet.getAmount()
		};
	}
}

export default BetRepositoryRedis;
