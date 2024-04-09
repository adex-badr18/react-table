import React from 'react';
import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { STATUSES } from '../data';

export const ColorIcon = ({ color, ...props }) => (
    <Box h='12px' w='12px' bg={color} borderRadius='3px' {...props} />
)

const StatusCell = ({ getValue, row, column, table }) => {
    const { name, color } = getValue() || {};
    const { updateData } = table.options.meta;

    return (
        <Menu
            isLazy
            offset={[0, 0]}
            autoSelect={false}
            flip={false}
        >
            <MenuButton
                h='100%'
                w='100%'
                textAlign='left'
                p={1.5}
                color='gray.900'
                bg={color || 'red.400'}
            >
                {name || '--Set status--'}
            </MenuButton>
            <MenuList color='gray.800'>
                <MenuItem
                    onClick={() => updateData(row.index, column.id, null)}
                >
                    <ColorIcon color='red.400' mr='3' />
                    None
                </MenuItem>
                {
                    STATUSES.map(status => (
                        <MenuItem
                            key={status.id}
                            onClick={() => updateData(row.index, column.id, status)}
                        >
                            <ColorIcon color={status.color} mr='3' />
                            {status.name}
                        </MenuItem>
                    ))
                }
            </MenuList>
        </Menu>
    )
}

export default StatusCell;