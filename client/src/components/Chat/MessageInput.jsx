import React from 'react'

import PropTypes from 'prop-types';

import { ImCancelCircle } from 'react-icons/im';
import { IoSend } from 'react-icons/io5';

import EmojiPicker from '../EmojiPicker';
import useKeyPress, { ShortcutFlags } from 'src/hooks/useKeyPress';

const MessageInput = ({
	inputRef,
	message,
	handleTypingStatus,
	setMessage,
	editing,
	cancelEdit,
	handleSubmit
}) => {
	// Define a new function to handle "Ctrl + Enter" key press
	const handleCtrlEnter = (e) => {
		if (e.ctrlKey && e.key === 'Enter') {
			handleSubmit(e);
		}
	};

	// Use the useKeyPress hook to listen for "Ctrl + Enter" key press
	useKeyPress(['Enter'], handleCtrlEnter, ShortcutFlags.ctrl);
	return (
		<>
			<form className="flex justify-center items-center mt-[40px]" onSubmit={handleSubmit}>
				<div className="w-full flex items-center justify-between bg-secondary rounded-l-md max-h-[150px] relative">
					<textarea
						placeholder="Send a Message....."
						className="h-[45px] focus:outline-none w-[96%] bg-secondary text-white rounded-[15px] resize-none pl-[22px] pr-[22px] py-[10px] text-[18px] placeholder-shown:align-middle min-h-[40px] max-h-[100px] overflow-y-scroll"
						ref={inputRef}
						value={message}
						onChange={handleTypingStatus}
					/>
					<EmojiPicker
						onEmojiPick={setMessage}
						focusInput={() => inputRef.current.focus()} />
					{editing.isediting && (
						<ImCancelCircle
							onClick={cancelEdit}
							className="fill-white mr-5 scale-[1.3] cursor-pointer"
						/>
					)}
				</div>
				<button
					type="submit"
					className="bg-[#FF9F1C] h-[47px] w-[70px] flex justify-center items-center rounded-r-md"
				>
					<IoSend className="fill-primary scale-[2]" />
				</button>
			</form>
		</>
	)
}

export default MessageInput

MessageInput.propTypes = {
	inputRef: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired,
	handleTypingStatus: PropTypes.func.isRequired,
	setMessage: PropTypes.func.isRequired,
	editing: PropTypes.object.isRequired,
	cancelEdit: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};
