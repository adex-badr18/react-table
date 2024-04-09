import { Box, Icon, Text, ButtonGroup, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import DATA from "../data";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";
import Filters from "./Filters";
import SortIcon from "./icons/SortIcon";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const columns = [
    {
        accessorKey: 'task',
        header: 'Task',
        size: 225,
        cell: EditableCell,
        enableColumnFilter: true,
        filterFn: 'includesString',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: StatusCell,
        enableColumnFilter: true,
        enableSorting: false,
        filterFn: (row, columnId, filterStatuses) => {
            if (filterStatuses.length === 0) return true;
            const status = row.getValue(columnId);
            return filterStatuses.includes(status?.id);
        }
    },
    {
        accessorKey: 'due',
        header: 'Due',
        cell: DateCell
    },
    {
        accessorKey: 'notes',
        header: 'Notes',
        size: 225,
        cell: EditableCell,
    },
];

const TaskTable = () => {
    const [data, setData] = useState(DATA);
    const [columnFilters, setColumnFilters] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: 'onChange',
        meta: {
            updateData: (rowIndex, columnId, value) =>
                setData(prev => prev.map((row, index) => (
                    index === rowIndex ? {
                        ...prev[rowIndex],
                        [columnId]: value,
                    } : row
                )))
        }
    });

    // console.log(columnFilters);

    return (
        <Box>
            <Filters
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
            <Box className='table' w={table.getTotalSize()}>
                {
                    table.getHeaderGroups().map(headerGroup => (
                        <Box className='tr' key={headerGroup.id}>
                            {
                                headerGroup.headers.map(header => (
                                    <Box className='th' w={header.getSize()} key={header.id}>
                                        {header.column.columnDef.header}

                                        {header.column.getCanSort() && (
                                            <Icon
                                                as={SortIcon}
                                                fontSize={14}
                                                mx={3}
                                                onClick={header.column.getToggleSortingHandler()}
                                            />
                                        )}

                                        {
                                            {
                                                'asc': <TbSortAscending size={14} />,
                                                'desc': <TbSortDescending size={14} />
                                            }[header.column.getIsSorted()]
                                        }

                                        <Box
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                                        />
                                    </Box>
                                ))
                            }
                        </Box>
                    ))
                }

                {
                    table.getRowModel().rows.map(row => (
                        <Box className='tr' key={row.id}>
                            {
                                row.getVisibleCells().map(cell => (
                                    <Box className='td' w={cell.column.getSize()} key={cell.id}>
                                        {
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        }
                                    </Box>
                                ))
                            }
                        </Box>
                    ))
                }
            </Box>
            <br />
            <Text mb={2}>
                Page {table.getState().pagination.pageIndex + 1} of {" "}
                {table.getPageCount()}
            </Text>

            <ButtonGroup size='sm' isAttached variant='outline'>
                <IconButton
                    icon={<GrFormPrevious size={16} />}
                    onClick={() => table.previousPage()}
                    isDisabled={!table.getCanPreviousPage()}
                    colorScheme="white"
                />
                <IconButton
                    icon={<GrFormNext size={16} />}
                    onClick={() => table.nextPage()}
                    isDisabled={!table.getCanNextPage()}
                    colorScheme="white"
                />
            </ButtonGroup>
        </Box>
    )
};
export default TaskTable;
