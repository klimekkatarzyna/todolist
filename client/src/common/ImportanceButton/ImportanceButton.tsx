import React, { FC, useMemo } from 'react';
import { Star } from 'react-feather';
import { Tooltip } from '../Tooltip/Tooltip';

export const ImportanceButton: FC<{ isChecked: boolean; onClick: () => void }> = ({ isChecked, onClick }) => {
	const tooltipText = useMemo(() => (!isChecked ? 'Oznacz zadanie jako wazne' : 'Usuń ważność'), [isChecked]);

	return (
		<button onClick={onClick} className='relative border-none bg-inherit'>
			<input type='checkbox' checked={isChecked} onChange={() => {}} className='hidden' />
			<Tooltip position={'right'} text={tooltipText}>
				<div>
					<Star className={`icon-style stroke-blue ${isChecked && 'fill-blue'}`} />
				</div>
			</Tooltip>
		</button>
	);
};