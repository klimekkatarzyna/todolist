import { FC, useCallback } from 'react';
import { IList } from '@kkrawczyk/todo-common';
import { useHistory } from 'react-router-dom';
import { useSharingData } from '../../hooks/useSharingData';
import { useMutation, useQueryClient } from 'react-query';
import { updateMembersList } from '../../actions/sharing';
import { Loader } from 'react-feather';
import { QueryKey, ROUTE } from '../../enums';
import toast from 'react-hot-toast';

interface IRemoveMember {
	listDataResponse: IList;
	onNextStep: () => void;
}

export const RemoveMember: FC<IRemoveMember> = ({ listDataResponse, onNextStep }) => {
	const query = useQueryClient();
	const history = useHistory();
	const { isOwner, authData } = useSharingData(listDataResponse?.userId);

	const { mutate, isLoading, isError } = useMutation(updateMembersList, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.getListById]);
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Użytkownik usunięty z listy');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const onUpdateMembersList = useCallback(() => {
		mutate({ _id: listDataResponse?._id, member: authData?._id });
		history.push(ROUTE.home);
	}, [listDataResponse, authData]);

	return (
		<>
			{isOwner ? (
				!!listDataResponse?.members?.length && (
					<button
						onClick={onNextStep}
						className='flex p4 cursor-pointer text-blue bg-inherit text-center border-none border-y-2 border-solid mt-4 mx-auto mb-0 text-red hover:bg-white hover:border'>
						{'Zarządzaj dostępem'}
					</button>
				)
			) : (
				<button
					onClick={onUpdateMembersList}
					className='flex p4 cursor-pointer text-blue bg-inherit text-center border-y-2 border-solid mt-4 mx-auto mb-0 hover:bg-white'>
					{'Opuść listę'}
					{isLoading && <Loader />}
				</button>
			)}
		</>
	);
};
