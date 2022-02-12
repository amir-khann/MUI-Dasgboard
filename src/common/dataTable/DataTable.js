/*eslint-disable*/
import React from "react";
import {
    useTable,
    useFilters,
    useAsyncDebounce,
    useSortBy,
    usePagination,
} from "react-table";
import classnames from "classnames";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";
import Pagination from "components/Pagination/Pagination.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { Button, MenuItem, Select, makeStyles, TextField } from "@material-ui/core";

import Header from './Header';
import Row from './Row';
import DefaultColumnFilter from './filters/DefaultColumnFilter';

import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";

const numberOfRowsData = [10, 20, 50, 100];

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const newStyles = {
    ...styles,
    formControlMargins: {
        margin: "3px 0 !important",
    },
    gridContainer: {
        justifyContent: "center",
    },
    pagination: {
        float: 'right',
        marginTop: '50px'
    }
};



const useStyles = makeStyles(newStyles);

export default function Table(props) {
    const { columns, data, DEFAULT_SORT, DEFAULT_FILTER, handleOnClick } = props;

    const [numberOfRows, setNumberOfRows] = React.useState(10);
    const [pageSelect, handlePageSelect] = React.useState(0);

    const classes = useStyles();

    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const tableInstance = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
            initialState: {
                pageSize: 10,
                pageIndex: 0,
                sortBy: DEFAULT_SORT,
                filters: DEFAULT_FILTER
            },
        },
        useFilters, // useFilters!
        useSortBy,
        usePagination
    );

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,
        state, visibleColumns, nextPage, pageOptions, pageCount, previousPage,
        canPreviousPage, canNextPage, setPageSize, gotoPage,
        state: { pageIndex, pageSize },
    } = tableInstance

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    // const firstPageRows = rows.slice(0, 10);
    let pageSelectData = Array.apply(
        null,
        Array(pageOptions.length)
    ).map(function () { });


    return (
        <>
            <div className="ReactTable -striped -highlight">
                <table {...getTableProps()} className="rt-table">
                    <Header
                        headerGroups={headerGroups}
                    />
                    <tbody {...getTableBodyProps()} className="rt-tbody">
                        {page.map((rowData, index) => {
                            prepareRow(rowData);
                            return (
                                <Row
                                    key={`column-${index}`}
                                    index={index}
                                    rowData={rowData}
                                    handleOnClick={handleOnClick}
                                />
                            );
                        })}
                    </tbody>
                </table>
                <div className="pagination-bottom">
                    <div
                        className={classnames("pagination", classes.pagination)}
                    >
                        {/* <Pagination
                            onClick={() => nextPage()}
                            pages={[
                                { text: "PREV" },
                                { text: 1 },
                                { text: 2 },
                                { active: true, text: 3 },
                                { text: 4 },
                                { text: 5 },
                                { text: "NEXT" },
                            ]}
                            color="primary"
                        /> */}

                        <Select
                            value={pageSize}
                            classes={{
                                select: classes.select,
                            }}
                            MenuProps={{
                                className: classes.selectMenu,
                            }}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {numberOfRowsData.map(pageSize => (
                                <MenuItem key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </Button>{' '}
                        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            PREV
                        </Button>{' '}
                        <Button onClick={() => nextPage()} disabled={!canNextPage}>
                            NEXT
                        </Button>{' '}
                        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </Button>{' '}
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        {/* <span>
                            | Go to page:{' '}

                        </span>{' '}
                        <TextField
                            variant="outlined"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                        //style={{ width: '100px' }}
                        /> */}

                    </div>
                    {/* <div className="-pagination">
                        <div className="-previous">
                            <button
                                type="button"
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="-btn"
                            >
                                Previous
                            </button>
                        </div>
                        <div className="-center">
                            <GridContainer className={classes.gridContainer}>
                                <GridItem xs={12} sm={6} md={4}>
                                    <FormControl
                                        fullWidth
                                        className={
                                            classes.selectFormControl +
                                            " " +
                                            classes.formControlMargins
                                        }
                                    >
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={pageSelect}
                                            onChange={(event) => {
                                                gotoPage(event.target.value);
                                                handlePageSelect(event.target.value);
                                            }}
                                            inputProps={{
                                                name: "pageSelect",
                                                id: "page-select",
                                            }}
                                        >
                                            {pageSelectData.map((prop, key) => {
                                                return (
                                                    <MenuItem
                                                        key={key}
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected,
                                                        }}
                                                        value={key}
                                                    >
                                                        Page {key + 1}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4}>
                                    <FormControl
                                        fullWidth
                                        className={
                                            classes.selectFormControl +
                                            " " +
                                            classes.formControlMargins
                                        }
                                    >
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={numberOfRows}
                                            onChange={(event) => {
                                                setPageSize(event.target.value);
                                                setNumberOfRows(event.target.value);
                                            }}
                                            inputProps={{
                                                name: "numberOfRows",
                                                id: "number-of-rows",
                                            }}
                                        >
                                            {numberOfRowsData.map((prop) => {
                                                return (
                                                    <MenuItem
                                                        key={prop}
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected,
                                                        }}
                                                        value={prop}
                                                    >
                                                        {prop} rows
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div className="-next">
                            <button
                                type="button"
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className="-btn"
                            >
                                Next
                            </button>
                        </div>
                    </div> */}

                </div>
            </div>
        </>
    );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

// export default Table;
