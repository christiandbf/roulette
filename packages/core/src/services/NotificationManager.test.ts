import NotificationManager, {
	NotificationProtocol
} from './NotificationManager';
import NotificationSNSMock from './NotificationSNS';

jest.mock('./NotificationSNS', () => {
	return jest.fn().mockReturnValue({});
});

describe('Get instance singleton', () => {
	it('Should return same instance', () => {
		const instance1 = NotificationManager.getInstance({
			protocol: NotificationProtocol.SNS
		});
		expect(instance1).toBeTruthy();
		const instance2 = NotificationManager.getInstance({
			protocol: NotificationProtocol.SNS
		});
		expect(instance2).toBeTruthy();

		expect(NotificationSNSMock).toHaveBeenCalledTimes(1);
		expect(instance1).toBe(instance2);
	});
});
