import {createContext} from "react";
import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";

export interface NotificationService {
    showSuccessMessage: (text: string) => void;
    showErrorMessage: (text: string) => void;
    showCustomMessage: (text: string, color: SemanticCOLORS) => void;
    hideMessage: () => void;
};

export const NotificationContext = createContext<NotificationService | null>(null);
