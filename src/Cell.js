import React from 'react';

const Cell = ({ value, onClick }) => {
    const getColor = () => {
        if (value === 'R') return 'red';
        if (value === 'Y') return 'yellow';
        return 'white';
    };

    return (
        <div onClick={onClick} style={{
            width: '50px',
            height: '50px',
            backgroundColor: getColor(),
            border: '1px solid black'
        }}>
        </div>
    );
};

export default Cell;

