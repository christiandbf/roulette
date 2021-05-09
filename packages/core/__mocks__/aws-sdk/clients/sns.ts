export default jest.fn().mockReturnValue({
	publish: jest.fn().mockReturnValue({
		promise: jest.fn().mockResolvedValue(undefined)
	})
});
