import React from 'react';
import classnames from "classnames";

export default function Header(props) {

    const { headerGroups } = props;

    return (
        <>
            <thead className="rt-thead -header">
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="rt-tr">
                        {headerGroup.headers.map((column, key) => {
                            return (
                                <th
                                    className={classnames("rt-th rt-resizable-header", {
                                        "-cursor-pointer": !column.disableSortBy,
                                        "-sort-asc": column.isSorted && !column.isSortedDesc,
                                        "-sort-desc": column.isSorted && column.isSortedDesc,
                                    })}
                                    style={{
                                        ...column.style,
                                    }}
                                >
                                    <div
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="rt-resizable-header-content">
                                        {column.render("Header")}
                                    </div>
                                    {/* Render the columns filter UI */}
                                    <div>
                                        {column.canFilter
                                            ? column.render("Filter")
                                            : null}
                                    </div>
                                </th>
                            )
                        })}
                    </tr>
                ))}
            </thead>
        </>
    )
}