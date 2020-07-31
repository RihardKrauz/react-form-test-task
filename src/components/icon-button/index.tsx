import React from 'react';
import './styles.scss';
import {Icon} from "semantic-ui-react";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";

type IconButtonProps = {
    icon: SemanticICONS;
    text: string;
    handler: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({icon, text, handler}) => {
    return (<div className='icon-button' onClick={handler}><Icon name={icon}></Icon> {text}</div>)
}

export default IconButton;
