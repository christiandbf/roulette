import NotificationSNS from './NotificationSNS';
import Roulette from '../domain/RouletteEntity';
import SNSMock from 'aws-sdk/clients/sns';

describe('NotificationSNS', () => {
	const sns = new SNSMock();
	const notificationSNS = new NotificationSNS();
	const roulette: Roulette = new Roulette({
		name: 'Royal 007',
		id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
		isOpen: true
	});

	it('Notify when roulette is open', async () => {
		await notificationSNS.notifyRouletteOpen(roulette);
		expect(sns.publish).toHaveBeenCalledWith({
			Message:
				'Roulette with ID ff6960b0-b015-11eb-8b4e-bd5c14d98227 and name Royal 007 is open, you can send your bets now!!!',
			TopicArn: 'Development'
		});
		expect(sns.publish).toHaveBeenCalledTimes(1);
	});
});
