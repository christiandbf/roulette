const roulette = {
	find: jest.fn(),
	findById: jest.fn(),
	crate: jest.fn(),
	update: jest.fn()
};

const bet = {
	find: jest.fn(),
	findById: jest.fn(),
	crate: jest.fn(),
	update: jest.fn(),
	findByRouletteId: jest.fn()
};

export default {
	getInstance: jest.fn().mockReturnValue({
		roulette,
		bet
	})
};
