import React from 'react';
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import MyButton from "../Elements/Button/MyButton";

const MyModal = ({ isShowing, handleSubmit, onSubmit, handleHideModal, isCreating, children, title, style }) => {
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
																{isCreating ? "Create" : title}
															</MyButton>
															<MyButton styleModify={styles.modalBtnDelete} onClick={() => handleHideModal(false)}>
																<i className="bi bi-x text-4xl"></i>
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
