import React from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    Icon,
    Text,
    Flex,
    VStack,
} from '@chakra-ui/react';
import FilterIcon from './icons/FilterIcon';
import { STATUSES } from '../data';
import { ColorIcon } from './StatusCell';

const StatusItem = ({ status, setColumnFilters, isActive }) => {
    return (
        <Flex
            align='center'
            cursor='pointer'
            borderRadius={5}
            fontWeight='bold'
            bg={isActive ? 'gray.900' : 'transparent'}
            p={1.5}
            onClick={() => (
                setColumnFilters(prev => {
                    const statuses = prev.find(filter => filter.id === 'status')?.value;
                    if (!statuses) {
                        return [
                            ...prev,
                            {
                                id: 'status',
                                value: [status.id],
                            }
                        ]
                    }

                    return prev.map(filterObj =>
                        filterObj.id === 'status' ?
                            {
                                ...filterObj,
                                value: isActive ?
                                    statuses.filter(statusId => statusId !== status.id) :
                                    [...statuses, status.id]
                            } : filterObj

                    )
                })
            )}
            _hover={{ bg: 'gray.900' }}
        >
            <ColorIcon color={status.color} mr='3' />
            {status.name}
        </Flex>
    )
};

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
    const filterStatuses = columnFilters.find(f => f.id === "status")?.value || [];

    return (
        <Popover isLazy>
            <PopoverTrigger>
                <Button
                    size='sm'
                    bg='gray.600'
                    color='gray.200'
                    leftIcon={<Icon as={FilterIcon} fontSize={18} />}
                    _hover={{ bg: 'gray.700' }}
                >
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent bg='gray.800'>
                <PopoverArrow bg='gray.800' />
                <PopoverCloseButton />
                <PopoverBody>
                    <Text fontSize='md' fontWeight='bold' mb={4}>Filter By:</Text>

                    <Text color='gray.400' fontWeight='bold' mb={1}>Status</Text>

                    <VStack align='flex-start' spacing={1}>
                        {
                            STATUSES.map(status => (
                                <StatusItem status={status} setColumnFilters={setColumnFilters} isActive={filterStatuses.includes(status.id)} key={status.id} />
                            ))
                        }
                    </VStack>

                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default FilterPopover;