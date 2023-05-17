import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, tags, onClick, largeImageURL }) => {
  return (
    <ImageItem onClick={() => onClick({ tags, largeImageURL })}>
      <Image src={webformatURL} alt={tags} />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
