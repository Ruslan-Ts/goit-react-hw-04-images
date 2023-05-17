import { Component } from "react";
import { Overlay, ModalBox } from "./Modal.styled";


class Modal extends Component {
    onCloseModal = (e) => {
      if (e.code === 'Escape') {
          this.props.onClose();
        };
    };

    onHandleClick = (e) => {
      if (e.target === e.currentTarget) {
          this.props.onClose();
        };
    };

    componentDidMount() {
window.addEventListener('keydown', this.onCloseModal)
    };

    componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModal)
    };
    
    render() {
        const { largeImageURL, tags } = this.props;
        return (<Overlay onClick={this.onHandleClick}>
            <ModalBox>
                <img src={largeImageURL} alt={tags} />
            </ModalBox>
        </Overlay>);
    };
};

export default Modal;