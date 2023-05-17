import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { getImages } from 'service/apiPixabay';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Notiflix from 'notiflix';
import { Circles } from 'react-loader-spinner';

class App extends Component {
  state = {
    value: '',
    isLoading: false,
    isVisibleBtn: false,
    isOpenModal: false,
    page: 1,
    images: [],
    largeImageURL: null,
    tagsForModal: '',
  };

  async componentDidUpdate(prevProp, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const {
          data: { hits, totalHits },
        } = await getImages({ value: this.state.value, page: this.state.page });
        if (!hits.length) {
          return Notiflix.Notify.failure('Nothing');
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...this.getNormalizedImg(hits)],
          isVisibleBtn: this.state.page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  getNormalizedImg(array) {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  onSubmit = newValue => {
    this.setState({ value: newValue.trim(), images: [], page: 1 });
  };

  onCloseModal() {}

  handlerOnClickImg = ({ tags, largeImageURL }) => {
    this.setState({ isOpenModal: true, tagsForModal: tags, largeImageURL });
  };

  onClose = () => {
    this.setState({ isOpenModal: false });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      images,
      isOpenModal,
      largeImageURL,
      tagsForModal,
      isVisibleBtn,
      isLoading,
    } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length === 0 && (
          <>
            {/* <p>Type something</p> */}
            {isLoading && (
              <Circles
                height="80"
                width="80"
                color="blue"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </>
        )}
        {images.length !== 0 && (
          <>
            <ImageGallery images={images} onClick={this.handlerOnClickImg} />{' '}
            {isLoading && (
              <Circles
                height="80"
                width="80"
                color="blue"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
            {isVisibleBtn && !isLoading && (
              <Button onClick={this.handleLoadMoreClick} />
            )}
          </>
        )}
        {isOpenModal && (
          <Modal
            onClose={this.onClose}
            largeImageURL={largeImageURL}
            tags={tagsForModal}
          />
        )}
      </Container>
    );
  }
}

export default App;
