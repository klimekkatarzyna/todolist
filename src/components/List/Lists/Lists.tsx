import { FC } from 'react';
import styled from 'styled-components';
import { IListItem, IListItemType } from '../../../interfaces';
import useList from '../useList';
import { MenuListItem } from '../../MenuListItem/MenuListItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
`;

const Lists: FC = () => {
    const { getListsLoading, getListsQuery } = useList();

    return (
        <Wrapper>
            {getListsLoading && <span>{'loading...'}</span>}
            {getListsQuery?.body?.lists?.map((item: IListItem) => (
                <MenuListItem listItem={item} type={IListItemType.TASK} />
            ))}
        </Wrapper>
    );
};

export default Lists;