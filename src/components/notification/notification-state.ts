import {NotificationProps} from "./notification";

export interface NotificationState extends NotificationProps {
    isVisible: boolean;
    timer?: number | null;
}

export const initialNotificationState: NotificationState = Object.freeze({
    isVisible: false,
    text: '',
    color: 'blue',
    timer: null
});
