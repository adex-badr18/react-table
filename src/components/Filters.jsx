import React from 'react';
import { Box, InputGroup, InputLeftElement, Input, Icon } from '@chakra-ui/react';
import SearchIcon from './icons/SearchIcon';

const Filters = ({ columnFilters, setColumnFilters }) => {
    const taskName = columnFilters.find(f => f.id === 'task')?.value || '';

    const onFilterChange = (id, value) => {
        setColumnFilters(prev => prev
            .filter(f => f.id !== id)
            .concat({ id, value }));
    };

    return (
        <Box mb={6}>
            <InputGroup size='sm' maxW='12rem'>
                <InputLeftElement pointerEvents='none'>
                    <Icon as={SearchIcon} />
                </InputLeftElement>
                <Input
                    type='text'
                    variant='outline'
                    placeholder='Task name'
                    borderRadius={5}
                    value={taskName}
                    onChange={(e) => onFilterChange('task', e.target.value)}
                />
            </InputGroup>
        </Box>
    )
}

export default Filters;