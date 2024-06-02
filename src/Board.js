import React from 'react';
import Cell from './Cell';

const Board = ({ board, onCellClick }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 50px)', gridGap: '5px' }}>
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Cell key={`${rowIndex}-${colIndex}`} value={cell} onClick={() => onCellClick(colIndex)} />
                ))
            )}
        </div>
    );
};

export default Board;
