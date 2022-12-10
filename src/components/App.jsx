import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import fetchImages from 'services/pixabay-api';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal/Modal';
import { AppStyled } from './App.styled';
import { Container } from './Section/Section.styled';
import Notification from './Notification/Notification';
import Loader from './Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query !== '') {
      getImages();
    }

    function getImages() {
      setIsLoading(true);
      fetchImages(query, page)
        .then(({ data: { hits, totalHits } }) => {
          if (hits.length !== 0) {
            setImages(prevState => [...prevState, ...hits]);
            setTotalImages(totalHits);
            setStatus('resolved');
            setError('');
          } else {
            setStatus('rejected');
          }
        })
        .catch(error => {
          console.log(error.message);
          setError('Something went wrong!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, page]);

  const handleFormSubmit = submitQuery => {
    if (submitQuery.trim() !== '' && submitQuery !== query) {
      setStatus('idle');
      setQuery(submitQuery);
      setPage(1);
      setImages([]);
    }
    if (submitQuery.trim() === '') {
      setStatus('emptyQuery');
      setQuery('');
      setImages([]);
      setPage(1);
      setTotalImages(0);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = data => {
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  const maxPage = Math.ceil(totalImages / 12);
  return (
    <AppStyled>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'resolved' && (
        <>
          <ImageGallery images={images} openModal={openModal} />

          {isLoading ? (
            <Loader />
          ) : (
            maxPage !== page && (
              <Button text="Load more" clickHandler={loadMore} />
            )
          )}

          {currentImage && (
            <Modal image={currentImage} closeModal={closeModal} />
          )}
        </>
      )}
      {status === 'rejected' && (
        <Container>
          <Notification
            message={'There are no results that match your search!'}
          />
        </Container>
      )}
      {status === 'emptyQuery' && (
        <Container>
          <Notification message={'Please write something first!'} />
        </Container>
      )}
      {error !== '' && (
        <Container>
          <Notification message={error} />
        </Container>
      )}
    </AppStyled>
  );
};

export default App;
