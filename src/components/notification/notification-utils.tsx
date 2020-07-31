import React, {useReducer} from "react";
import {NotificationContext, NotificationService} from "./notification-context";
import Portal from "../portal";
import Notification from "./notification";
import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";
import { initialNotificationState} from "./notification-state";
import notificationReducer from './notification-reducer';
import {
    hideNotificationAction, setHideNotificationTimerAction,
    showCustomNotificationAction,
    showErrorNotificationAction,
    showSuccessNotificationAction
} from "./notification-actions";

const hideDelayMs = 3000;

export const withNotifications = <T extends object>(WrappedComponent: React.ComponentType) => {
    return (props: T) => {
        const [{ isVisible, text, color }, dispatch] = useReducer(notificationReducer, initialNotificationState);

        const setHideTimeout = () => {
            dispatch(setHideNotificationTimerAction(window.setTimeout(() => {
                dispatch(hideNotificationAction());
            }, hideDelayMs)));
        }

        const notificationService: NotificationService = {
            showSuccessMessage: (text: string) => {
                dispatch(showSuccessNotificationAction(text));
                setHideTimeout();
            },
            showErrorMessage: (text: string) => {
                dispatch(showErrorNotificationAction(text));
                setHideTimeout();
            },
            showCustomMessage: (text: string, color: SemanticCOLORS) => {
                dispatch(showCustomNotificationAction(text, color));
                setHideTimeout();
            },
            hideMessage: () => {
                dispatch(hideNotificationAction());
            }
        };

        return (<>
            <NotificationContext.Provider value={notificationService}>
                <WrappedComponent {...props} />
            </NotificationContext.Provider>

            {isVisible && <Portal>
                <Notification
                    text={text}
                    color={color}
                    close={() => dispatch(hideNotificationAction())} />
            </Portal>}
        </>);
    };
}
