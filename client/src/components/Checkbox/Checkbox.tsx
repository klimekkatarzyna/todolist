import React, { FC } from 'react';
import { Tooltip } from '../Tooltip/Tooltip';

interface CheckboxProps {
	color: string | undefined;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	id?: string;
	key?: string;
	disabled?: boolean;
	tooltipText?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ disabled, color, checked, onChange, id, key, children, tooltipText }) => {
	return (
		<Tooltip position={'left'} text={tooltipText}>
			<label className='relative cursor-pointer flex items-center leading-5'>
				<input
					type='checkbox'
					checked={!!checked}
					onChange={onChange}
					id={id}
					key={key}
					disabled={disabled}
					className={`w-5 h-5 rounded-full text-${color} border-solid border-2 border-${color}`}
				/>
				{children && <div className='text-sm ml-2'>{children}</div>}
			</label>
		</Tooltip>
	);
};
