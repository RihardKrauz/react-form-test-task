import {initialNotificationState, NotificationState} from "./notification-state";
import {
    HIDE_NOTIFICATION,
    SET_HIDE_NOTIFICATION_TIMER,
    SHOW_ERROR_NOTIFICATION,
    SHOW_SUCCESS_NOTIFICATION,
    SHOW_CUSTOM_NOTIFICATION,
    UserNotificationAction
} from './notification-actions';
import {NotificationProps} from "./notification";

export default function notificationReducer(state: NotificationState, action: UserNotificationAction<NotificationProps | null | { timer: number | null }>) {
    switch(action.type) {
        case SHOW_CUSTOM_NOTIFICATION:
        case SHOW_ERROR_NOTIFICATION:
        case SHOW_SUCCESS_NOTIFICATION: {
            return { ...state, ...action.payload, isVisible: true };
        }
        case HIDE_NOTIFICATION: {
            if (state.timer) {
                clearTimeout(state.timer);
            }
            return initialNotificationState;
        }
        case SET_HIDE_NOTIFICATION_TIMER: {
            if (state.timer) {
                clearTimeout(state.timer);
            }
            return { ...state, ...action.payload };
        }
        default:
            return state;
    }
}
