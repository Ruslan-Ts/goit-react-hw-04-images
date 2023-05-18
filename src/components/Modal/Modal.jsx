import { useEffect } from 'react';
import { Overlay, ModalBox } from './Modal.styled';

const Modal = ({ onClose, largeImageURL, tags }) => {
  const onCloseModal = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onHandleClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onCloseModal);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  }, []);

  return (
    <Overlay onClick={onHandleClick}>
      <ModalBox>
        <img src={largeImageURL} alt={tags} />
      </ModalBox>
    </Overlay>
  );
};

// class Modal extends Component {
//     onCloseModal = (e) => {
//       if (e.code === 'Escape') {
//           this.props.onClose();
//         };
//     };

//     onHandleClick = (e) => {
//       if (e.target === e.currentTarget) {
//           this.props.onClose();
//         };
//     };

//     componentDidMount() {
// window.addEventListener('keydown', this.onCloseModal)
//     };

//     componentWillUnmount() {
//     window.removeEventListener('keydown', this.onCloseModal)
//     };

//     render() {
//         const { largeImageURL, tags } = this.props;
//         return (<Overlay onClick={this.onHandleClick}>
//             <ModalBox>
//                 <img src={largeImageURL} alt={tags} />
//             </ModalBox>
//         </Overlay>);
//     };
// };

export default Modal;
