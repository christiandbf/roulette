export default jest.fn().mockReturnValue({
	set: jest.fn(),
	sadd: jest.fn(),
	smembers: jest.fn(),
	get: jest.fn()
});
