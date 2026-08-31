import React from 'react'
import useMutationData from '../../services/useMutationData';
import { useQueryClient } from '@tanstack/react-query';
import ConfirmDelete from '../../components/UI/ConfirmDelete';

function DeleteService({ serviceId, onCloseModal }) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutationData(
        (info) => `services/${info.id}`,
        'delete',
        'delete-service',
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['services-list'] });
            },
        }
    );

    const handleDelete = () => {
        mutate({ id: serviceId });
    };

    return (
        <ConfirmDelete
            resourceName="خدمت"
            onConfirm={handleDelete}
            onCloseModal={onCloseModal}
            disabled={isPending}
        />
    );
}

export default DeleteService