import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import MyButton from '../Elements/Button/MyButton';

const MyModal = ({ isShowing, handleSubmit, onSubmit, handleHideModal, isCreating, children, title, reset }) => {
    const handleModalClose = () => {
        handleHideModal(false);
    };
    return isShowing ? ReactDOM.createPortal(
      <React.Fragment>
          <div className={styles.layoutModal} onClick={handleModalClose} />
          <div className={styles.containerModal}>
              <div className={styles.modal}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      {children}
                      <div className={styles.groupBtn}>
                          <MyButton type="submit" styleModify={styles.modalBtnCreate}>
                              {isCreating ? 'Create' : title}
                          </MyButton>
                          <MyButton type="button" styleModify={styles.modalBtnDelete} onClick={handleModalClose}>
                              <i className="bi bi-x text-4xl" />
                          </MyButton>
                      </div>
                  </form>
              </div>
          </div>
      </React.Fragment>,
      document.body
    ) : null;
};

export default MyModal;
