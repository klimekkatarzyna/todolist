import React from 'react';
import { Board } from '../components/Board';
import Toolbar from '../components/Toolbar';

const Planned = () => {
    return (
        <Board>
            <Toolbar name={'Zaplanowane'} colorType={'blue'} />
        </Board>
    );
};

export default Planned;