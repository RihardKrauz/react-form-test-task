import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";
import { NotificationProps } from "./notification";

export const SHOW_SUCCESS_NOTIFICATION = 'SHOW_SUCCESS_NOTIFICATION';
export const SHOW_ERROR_NOTIFICATION = 'SHOW_ERROR_NOTIFICATION';
export const SHOW_CUSTOM_NOTIFICATION = 'SHOW_CUSTOM_NOTIFICATION';
export const SET_HIDE_NOTIFICATION_TIMER = 'SET_HIDE_NOTIFICATION_TIMER';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

type UserNotification = typeof SHOW_SUCCESS_NOTIFICATION
    | typeof SHOW_ERROR_NOTIFICATION
    | typeof SHOW_CUSTOM_NOTIFICATION
    | typeof HIDE_NOTIFICATION
    | typeof SET_HIDE_NOTIFICATION_TIMER;

export interface UserNotificationAction<T> {
    type: UserNotification;
    payload?: T;
}

export const showSuccessNotificationAction = (text: string): UserNotificationAction<NotificationProps> => ({
    type: SHOW_SUCCESS_NOTIFICATION,
    payload: {
        text,
        color: 'green'
    }
});

export const showErrorNotificationAction = (text: string): UserNotificationAction<NotificationProps> => ({
    type: SHOW_ERROR_NOTIFICATION,
    payload: {
        text,
        color: 'red'
    }
});

export const showCustomNotificationAction = (text: string, color: SemanticCOLORS): UserNotificationAction<NotificationProps> => ({
    type: SHOW_CUSTOM_NOTIFICATION,
    payload: {
        text,
        color
    }
});

export const hideNotificationAction = (): UserNotificationAction<null> => ({
    type: HIDE_NOTIFICATION
});

export const setHideNotificationTimerAction = (timer: number | null): UserNotificationAction<{ timer: number | null }> => ({
    type: SET_HIDE_NOTIFICATION_TIMER,
    payload: { timer }
});
