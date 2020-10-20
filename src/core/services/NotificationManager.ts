/* eslint-disable @typescript-eslint/no-empty-function */
import { strict as assert } from 'assert';
import Notification from './Notification';
import NotificationSNS from './NotificationSNS';

export enum NotificationProtocol {
  SNS = 'SNS'
}

interface Params {
  protocol: NotificationProtocol;
}

abstract class NotificationManager {
  private static notifications: Map<string, Notification> = new Map();

  static getInstance(params: Params): Notification {
    let notification: Notification | undefined = this.notifications.get(
      params.protocol
    );
    if (notification) return notification;
    if (params.protocol === NotificationProtocol.SNS)
      notification = new NotificationSNS();
    assert.ok(notification, `Protocol ${params.protocol} is not valid`);
    this.notifications.set(params.protocol, notification);

    return notification;
  }
}

export default NotificationManager;
