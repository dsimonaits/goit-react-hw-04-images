import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const Modal = ({ image, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };

    function closeByEsc({ code }) {
      if (code === 'Escape') {
        closeModal();
      }
    }
  }, [closeModal]);

  const closeByBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const { src, alt } = image;

  return (
    <Overlay onClick={closeByBackdropClick}>
      <ModalWindow>
        <img src={src} alt={alt} />
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
