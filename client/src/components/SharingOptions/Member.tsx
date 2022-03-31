import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { X } from '@styled-icons/feather';
import { useMutation, useQueryClient } from 'react-query';
import { Loader } from '../Loader/Loader';
import { removeMemberAction } from '../../actions/sharing';
import { useSharingData } from '../../hooks/useSharingData';
import { IList } from '@kkrawczyk/todo-common';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 0.5rem 0;

	> button {
		margin-left: auto;
		cursor: pointer;
	}
`;

export const Dot = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	margin-left: 0.5rem;
	font-size: 0.9rem;
	&:before {
		content: '';
		position: relative;
		left: -10px;
		width: 30px;
		height: 30px;
		background-color: ${COLOURS.red};
		border-radius: 50%;
	}
`;

const RemoveButton = styled.button`
	svg {
		width: 20px;
	}
`;

interface IMemberProps {
	listDataResponse: IList;
	member: string;
}

export const Member: FC<IMemberProps> = ({ listDataResponse, member }) => {
	const query = useQueryClient();
	const { isOwner } = useSharingData(listDataResponse?.userId);

	const { mutate, isLoading, isError } = useMutation(removeMemberAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
			query.invalidateQueries(['lists']);
		},
	});

	return (
		<Wrapper>
			<Dot />
			<p key={member}>{member}</p>
			{isOwner && (
				<RemoveButton onClick={() => mutate({ listId: listDataResponse?._id, member })}>
					<X />
				</RemoveButton>
			)}
			{isLoading && <Loader />}
		</Wrapper>
	);
};