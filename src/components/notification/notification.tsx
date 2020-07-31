import React from "react";
import './notification.scss';
import {Message} from "semantic-ui-react";
import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";

export type NotificationProps = {
    text: string;
    color?: SemanticCOLORS;
}

export type ClosableNotificationProps = {
    close: () => void;
}

const Notification: React.FC<NotificationProps & ClosableNotificationProps> = ({text, close, color = 'blue'}) => {
    return (<div className='notification'>
        <Message color={color}>
            <div className='notification__body'>
                <div className='notification__content'>
                    <p>{text}</p>
                </div>
                <div className='notification__close-action'>
                    <span onClick={close}>x</span>
                </div>
            </div>
        </Message>
    </div>)
}

export default Notification;
