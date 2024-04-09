import React from 'react';
import { Box, HStack, InputGroup, InputLeftElement, Input, Icon } from '@chakra-ui/react';
import SearchIcon from './icons/SearchIcon';
import FilterPopover from './FilterPopover';

const Filters = ({ columnFilters, setColumnFilters }) => {
    const taskName = columnFilters.find(f => f.id === 'task')?.value || '';

    const onFilterChange = (id, value) => {
        setColumnFilters(prev => prev
            .filter(f => f.id !== id)
            .concat({ id, value }));
    };

    return (
        <HStack mb={6} spacing={3}>
            <InputGroup size='sm' maxW='12rem'>
                <InputLeftElement pointerEvents='none'>
                    <Icon as={SearchIcon} />
                </InputLeftElement>
                <Input
                    type='text'
                    placeholder='Task name'
                    border='none'
                    borderRadius='md'
                    bg='gray.600'
                    color='gray.200'
                    value={taskName}
                    onChange={(e) => onFilterChange('task', e.target.value)}
                    _placeholder={{color: 'gray.400'}}
                />
            </InputGroup>
            <FilterPopover
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
        </HStack>
    )
}

export default Filters;