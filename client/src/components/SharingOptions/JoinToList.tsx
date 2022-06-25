import { FC } from 'react';
import { Loader } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addUserToMemberOfListAction, IShareLitDetails } from '../../actions/sharing';
import { Button } from '../Button/Button';
import { getStringAfterCharacter } from '../../utils/utilsFunctions';
import { QueryKey } from '../../enums';
import { useSwitchToFirstListItem } from '../../hooks/useSwitchToFirstListItem';

export const JoinToList: FC<{ listDataLoading: boolean; list: IShareLitDetails | undefined }> = ({ listDataLoading, list }) => {
	const query = useQueryClient();
	const history = useHistory();
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem(list?.listData._id);

	const { mutate, error, isLoading } = useMutation(addUserToMemberOfListAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.checkSession]);
			query.invalidateQueries([QueryKey.lists]);
			onHandleSwitchToFirstListItem();
		},
	});

	return (
		<>
			<h1 className='text-xl font-extralight m-4'>Dołącz do listy</h1>

			<p className='font-extralight'>
				{listDataLoading ? <Loader className='m-auto' /> : `Użytkownik`} <strong>{list?.listData?.owner}</strong> udostępnił Ci listę{' '}
				<strong>{`${list?.listData?.title}`}</strong>
			</p>

			<Button primary onClick={() => mutate(getStringAfterCharacter(history.location.search, '='))}>
				{'Dołącz do listy'}
				{isLoading && <Loader className='ml-2' />}
			</Button>
		</>
	);
};
