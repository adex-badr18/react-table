import React, { forwardRef } from 'react';
import { Center, Icon } from '@chakra-ui/react';
import CalendarIcon from './icons/CalendarIcon';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Center onClick={onClick} cursor='pointer' ref={ref}>
        {
            value ?
                <>{value}</> :
                <Icon as={CalendarIcon} fontSize='xl' />
        }
    </Center>
))

const DateCell = ({ getValue, row, column, table }) => {
    const date = getValue();
    const { updateData } = table.options.meta;

    return (
        <DatePicker
            wrapperClassName='date-wrapper'
            dateFormat='MMM d'
            selected={date}
            onChange={(date) => updateData(row.index, column.id, date)}
            customInput={<DateCustomInput />}
        />
    )
}

export default DateCell