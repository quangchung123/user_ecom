import React from 'react';
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import MyButton from "../Elements/Button/MyButton";

const MyModal = ({ isShowing, handleSubmit, onSubmit, handleHideModal, isCreating, children }) => {
		return isShowing ? ReactDOM.createPortal(
				<React.Fragment>
						<div className={styles.layoutModal} />
						<div className={styles.containerModal}>
								<div className={styles.modal}>
										<form onSubmit={handleSubmit(onSubmit)}>
												{children}
												<div>
														<div className={styles.groupBtn}>
																<MyButton styleModify={styles.modalBtnCreate}>
																		{isCreating ? "Create" : "Update"}
																</MyButton>
																<MyButton styleModify={styles.modalBtnDelete} onClick={handleHideModal}>
																		Cancel
																</MyButton>
														</div>
												</div>
										</form>
								</div>
						</div>
				</React.Fragment>, document.body
		) : null;
};

export default MyModal;
