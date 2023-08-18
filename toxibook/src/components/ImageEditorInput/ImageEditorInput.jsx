import React from 'react'
import { HiPencilSquare } from 'react-icons/hi2'

export const ImageEditorInput = React.forwardRef(({onChangeEvent, id}, ref) => {
	return (
		<>
			<input
				id={`${id}`}
				type="file"
				accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
				ref={ref}
				onChange={onChangeEvent}
			/>
			<label 
				htmlFor={`${id}`}
				className='centerFlex'
			>
				<HiPencilSquare />
			</label>
		</>
	);
});