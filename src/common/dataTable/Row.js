import React from 'react';
import RowColumn from './RowColumn';
import classnames from "classnames";

export default function Row(props) {

    const { index, rowData, handleOnClick } = props;

    return (
        <>
            {rowData &&
                <tr
                    {...rowData.getRowProps()}
                    className={classnames(
                        "rt-tr",
                        { " -odd": index % 2 === 0 },
                        { " -even": index % 2 === 1 }
                    )}
                >
                    {rowData.cells.map((cell) => {
                        return (
                            <RowColumn
                                cell={cell}
                                handleOnClick={handleOnClick}
                            />
                        );
                    })}
                </tr>
            }
        </>
    )
}