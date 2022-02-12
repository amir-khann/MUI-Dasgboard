import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    link: {
        '&:hover, &:focus': {
            'text-decoration': 'underline'
        }
    }
}));

export default function RowColumn(props) {

    const { cell, cell: { column: { onClick } }, handleOnClick } = props;
    const columnData = cell.render("Cell");

    const classes = useStyles();

    return (
        <>
            {onClick ? (
                <td
                    {...cell.getCellProps([
                        {
                            className: "rt-td",
                            style: cell.column.style,
                        },
                    ])}
                >
                    <a
                        className={classes.link}
                        onClick={() => handleOnClick(cell)}
                        href="javascript:void(0)"
                    >{columnData}</a>
                </td>
            ) :
                (
                    <td
                        {...cell.getCellProps([
                            {
                                className: "rt-td",
                                style: cell.column.style,
                            },
                        ])}
                    >
                        {columnData}
                    </td>
                )
            }
        </>
    )
}