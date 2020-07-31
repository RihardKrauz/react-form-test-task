import React, {useState} from 'react';
import './styles.scss';
import Portal from '../../components/portal';
import ModalPopup from '../../components/modal-popup';
import { Button } from 'semantic-ui-react'
import BillingDetailsForm from "../../components/billing-details-form";

const RootPage: React.FC = () => {
    const [showInputDataModal, setShowInputDataModal] = useState(false);

    function closeModal() {
        setShowInputDataModal(false);
    }

    return (<main>
        <Button onClick={() => { setShowInputDataModal(!showInputDataModal) }}>Input data</Button>
        {showInputDataModal && <Portal>
            <ModalPopup onCloseModal={closeModal}>
                <BillingDetailsForm onSuccess={closeModal}></BillingDetailsForm>
            </ModalPopup>
        </Portal>}
    </main>)
}

export default RootPage;
