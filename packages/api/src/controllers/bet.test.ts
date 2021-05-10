import request from 'supertest';
import app from '../app';
import { CreateBetUseCase } from '@roulette/core';

describe('POST /bets', () => {
	const user = '5ad84710-b014-11eb-b7c6-ff64634e2063';
	const bet = {
		selection: '1',
		rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229',
		amount: '100'
	};

	it('Should return 400 if user is not set', () => {
		return request(app)
			.post('/bets')
			.send(bet)
			.expect(400, {
				message: 'Not valid params',
				errors: [{ msg: 'Invalid value', param: 'user', location: 'headers' }]
			});
	});

	it('Should return 400 if body is not valid', () => {
		return request(app)
			.post('/bets')
			.set('User', user)
			.expect(400, {
				message: 'Not valid params',
				errors: [
					{ msg: 'Invalid value', param: 'selection', location: 'body' },
					{ msg: 'Invalid value', param: 'selection', location: 'body' },
					{ msg: 'Invalid value', param: 'rouletteId', location: 'body' },
					{ msg: 'Invalid value', param: 'amount', location: 'body' }
				]
			});
	});

	it('Should 201 bet created', async () => {
		const createRouletteUseCaseSpy = jest
			.spyOn(CreateBetUseCase.prototype, 'execute')
			.mockResolvedValue({
				id: 'AA6960b0-b015-11eb-8b4e-bd5c14d98229',
				selection: bet.selection,
				rouletteId: bet.rouletteId,
				userId: user,
				amount: parseInt(bet.amount)
			});
		await request(app).post('/bets').set('User', user).send(bet).expect(201, {
			id: 'AA6960b0-b015-11eb-8b4e-bd5c14d98229',
			selection: '1',
			rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			userId: '5ad84710-b014-11eb-b7c6-ff64634e2063',
			amount: 100
		});
		expect(createRouletteUseCaseSpy).toHaveBeenCalledWith({
			amount: '100',
			rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			selection: '1',
			userId: '5ad84710-b014-11eb-b7c6-ff64634e2063'
		});
		expect(createRouletteUseCaseSpy).toHaveBeenCalledTimes(1);
	});
});
