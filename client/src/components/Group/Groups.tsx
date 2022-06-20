import { FC, useCallback, useContext } from 'react';
import { ContextMenuOpion, QueryKey } from '../../enums';
import { IGroup } from '@kkrawczyk/todo-common';
import { ContextualModal } from '../Modal/ContextualModal';
import { Group } from './Group';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteGroup, getGroups } from '../../actions/groups';
import { Loader } from 'react-feather';
import { ContextMenuContext } from '../../ContextMenuProvider';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';
import { IQueryError } from '../../interfaces/app';

export const Groups: FC<{ isNavClosed: boolean }> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const isVisible = useRecoilValue(modalVisibilityState);
	const { contextualMenu } = useContext(ContextMenuContext);

	const { isLoading: getGroupsLoading, data } = useQuery<IGroup[] | undefined>(QueryKey.groups, getGroups);

	const { mutateAsync, error, isLoading } = useMutation(deleteGroup, {
		onSuccess: async response => {
			query.setQueryData<IGroup[] | undefined>([QueryKey.groups], (groups: IGroup[] | undefined) =>
				groups?.filter(group => group._id !== response.body?._id)
			);
			toast.success('Grupa usunięta');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	const onRemoveGroup = useCallback(async () => {
		if (contextualMenu?.type !== ContextMenuOpion.remove_group) return;
		await mutateAsync({ _id: contextualMenu?.elementId });
	}, [contextualMenu]);

	return (
		<div>
			{getGroupsLoading && <Loader />}
			{data?.map((group, index) => (
				<Group key={index} group={group} isNavClosed={isNavClosed} />
			))}
			{isVisible && (
				<ContextualModal
					title='Czy chcesz usunąć grupę?'
					onHandleAction={onRemoveGroup}
					contextualType={ContextMenuOpion.remove_group}
					isLoading={isLoading}
				/>
			)}
		</div>
	);
};
