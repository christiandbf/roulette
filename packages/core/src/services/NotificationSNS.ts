import { strict as assert } from 'assert';
import Notification from './Notification';
import Roulette from '../domain/RouletteEntity';
import SNS from 'aws-sdk/clients/sns';

class NotificationSNS implements Notification {
	private readonly TOPIC: string = process.env['SNS_TOPIC_ARN'] || '';
	private readonly REGION: string = process.env['REGION'] || '';
	private readonly API_VERSION: string = '2010-03-31';

	private readonly sns: SNS;

	constructor() {
		assert.ok(this.TOPIC.length > 0, 'Topic has not been set');
		assert.ok(this.REGION.length > 0, 'Region has not been set');
		this.sns = new SNS({
			apiVersion: this.API_VERSION,
			region: this.REGION
		});
	}

	async notifyRouletteOpen(roulette: Roulette): Promise<void> {
		assert.ok(roulette.getIsOpen(), 'Roulette is not open');
		const params = {
			Message: `Roulette with ID ${roulette.getId()} and name ${roulette.getName()} is open, you can send your bets now!!!`,
			TopicArn: this.TOPIC
		};
		await this.sns.publish(params).promise();
	}
}

export default NotificationSNS;
