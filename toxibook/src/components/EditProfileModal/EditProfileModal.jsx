import React, { useState } from 'react'
import InputComponent from "../Layout/InputComponent/InputComponent";
import { MdClose, MdPerson, MdTextSnippet } from 'react-icons/md';
import "./EditProfileModal.css";
import TextAreaInput from '../Layout/TextAreaInput/TextAreaInput';
import { updateUserDatasService } from '../../services/user.services';

const EditProfileModal = ({closeModal, onUpdateDatas}) => {
	const user = JSON.parse(localStorage.getItem("User"));
	const token = localStorage.getItem("AuthToken");
	const [bioContent, setBioContent] = useState(user.bio)
	const [usernameContent, setUsernameContent] = useState(user.username)

	async function handleUpdateUserDatas() {
		if(usernameContent === user.username && bioContent === user.bio) {
			closeModal();
			return;
		}

		const newUser = await updateUserDatasService(token, user._id, {bio: bioContent, username: usernameContent});
		localStorage.setItem("User", JSON.stringify(newUser));
		onUpdateDatas(newUser);
		closeModal();
	} 

	return (
		<section className="editProfileModal">
			<div className='editProfileContainer'>
				<span className="closeBtn" onClick={closeModal}><MdClose/></span>
				
				<div className="editProfileTitle">
					<h1>Editar Perfil</h1>
					<h2>Atualize suas informações aqui.</h2>
				</div>
				<div className="editProfileForm">
					<InputComponent 
						onInput={(e) => setUsernameContent(e.target.value)}
						text="Nome"
						id="NameInput"
						maxLength={20}
						placeholder={usernameContent}
						value={usernameContent}
						icon={<MdPerson/>}
						// ref={}
						/>
					<TextAreaInput 
						setTextContent={setBioContent}
						legend={"Biografia"}
						icon={<MdTextSnippet/>}
						placeholder={bioContent}
						value={bioContent}
					/>
					{/* <InputComponent 
						text="Biografia"
						id="BioInput"
						placeholder={user.bio}
						value={user.bio}
						icon={<MdTextSnippet/>}
						// ref={}
					/> */}
				</div>
				<div className="editProfileButtons">
					<button type="button" onClick={handleUpdateUserDatas}>Salvar</button>
					<button type="button" onClick={closeModal}>Cancelar</button>
				</div>
			</div>
		</section>
	)
}

export default EditProfileModal