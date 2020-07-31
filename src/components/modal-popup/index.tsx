import React, {MouseEvent} from 'react';
import './styles.scss';
import IconButton from "../icon-button";

type ModalPopupProps = {
    onCloseModal: () => void;
}

const ModalPopup: React.FC<ModalPopupProps> = ({onCloseModal, children}) => {
    const onFadeClick = () => {
        onCloseModal();
    }

    const onBodyClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    return (<div className='modal-popup' onClick={onFadeClick}>
        <div className='modal-popup__body' onClick={onBodyClick}>
            <div className='modal-popup__header'>
                <IconButton icon='close' text='Close' handler={onCloseModal} />
            </div>
            <div className='modal-popup__content'>{children}</div>
        </div>
    </div>);
}

export default ModalPopup;
