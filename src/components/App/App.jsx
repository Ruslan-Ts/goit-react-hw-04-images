import { useEffect, useState } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { getImages } from 'service/apiPixabay';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Notiflix from 'notiflix';
import { Circles } from 'react-loader-spinner';

const App = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tagsForModal, setTagsForModal] = useState('');

  useEffect(() => {
    setIsLoading(true);
    try {
      const getGalleryImg = async () => {
        const {
          data: { hits, totalHits },
        } = await getImages(value, page);

        if (!hits.length) {
          return Notiflix.Notify.failure('Nothing');
        }
        setImages(prevHits => [...prevHits, ...getNormalizedImg(hits)]);
        setIsVisibleBtn(page < Math.ceil(totalHits / 12));
      };
      getGalleryImg();
    } catch (error) {
      return Notiflix.Notify.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, value]);

  function getNormalizedImg(array) {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  const onSubmit = newValue => {
    setValue(newValue.trim());
    setImages([]);
    setPage(1);
  };

  const handlerOnClickImg = ({ tags, largeImageURL }) => {
    setIsOpenModal(true);
    setTagsForModal(tags, largeImageURL);
  };

  const onClose = () => {
    setIsOpenModal(false);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
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
          <ImageGallery images={images} onClick={handlerOnClickImg} />{' '}
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
            <Button onClick={handleLoadMoreClick} />
          )}
        </>
      )}
      {isOpenModal && (
        <Modal
          onClose={onClose}
          largeImageURL={largeImageURL}
          tags={tagsForModal}
        />
      )}
    </Container>
  );
};

// class App extends Component {
//   state = {
//     value: '',
//     isLoading: false,
//     isVisibleBtn: false,
//     isOpenModal: false,
//     page: 1,
//     images: [],
//     largeImageURL: null,
//     tagsForModal: '',
//   };

//   async componentDidUpdate(prevProp, prevState) {
//     if (
//       prevState.value !== this.state.value ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ isLoading: true });
//       try {
//         const {
//           data: { hits, totalHits },
//         } = await getImages({ value: this.state.value, page: this.state.page });
//         if (!hits.length) {
//           return Notiflix.Notify.failure('Nothing');
//         }
//         this.setState(prevState => ({
//           images: [...prevState.images, ...this.getNormalizedImg(hits)],
//           isVisibleBtn: this.state.page < Math.ceil(totalHits / 12),
//         }));
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   getNormalizedImg(array) {
//     return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
//       id,
//       webformatURL,
//       largeImageURL,
//       tags,
//     }));
//   }

//   onSubmit = newValue => {
//     this.setState({ value: newValue.trim(), images: [], page: 1 });
//   };

//   onCloseModal() {}

//   handlerOnClickImg = ({ tags, largeImageURL }) => {
//     this.setState({ isOpenModal: true, tagsForModal: tags, largeImageURL });
//   };

//   onClose = () => {
//     this.setState({ isOpenModal: false });
//   };

//   handleLoadMoreClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const {
//       images,
//       isOpenModal,
//       largeImageURL,
//       tagsForModal,
//       isVisibleBtn,
//       isLoading,
//     } = this.state;
//     return (
//       <Container>
//         <Searchbar onSubmit={this.onSubmit} />
//         {images.length === 0 && (
//           <>
//             {/* <p>Type something</p> */}
//             {isLoading && (
//               <Circles
//                 height="80"
//                 width="80"
//                 color="blue"
//                 ariaLabel="circles-loading"
//                 wrapperStyle={{}}
//                 wrapperClass=""
//                 visible={true}
//               />
//             )}
//           </>
//         )}
//         {images.length !== 0 && (
//           <>
//             <ImageGallery images={images} onClick={this.handlerOnClickImg} />{' '}
//             {isLoading && (
//               <Circles
//                 height="80"
//                 width="80"
//                 color="blue"
//                 ariaLabel="circles-loading"
//                 wrapperStyle={{}}
//                 wrapperClass=""
//                 visible={true}
//               />
//             )}
//             {isVisibleBtn && !isLoading && (
//               <Button onClick={this.handleLoadMoreClick} />
//             )}
//           </>
//         )}
//         {isOpenModal && (
//           <Modal
//             onClose={this.onClose}
//             largeImageURL={largeImageURL}
//             tags={tagsForModal}
//           />
//         )}
//       </Container>
//     );
//   }
// }

export default App;
