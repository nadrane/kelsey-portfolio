import React from "react";
import NavBar from "../components/NavBar";
import Gallery from "../components/Gallery";
import {fetchImages} from '../utils';

const containerStyle = {
  margin: "0 auto",
  padding: "1rem 24px"
};

function formatPhotos(photos) {
  return photos.map(photo => {
    return {
      id: photo.id,
      gallerySrc: 'images/gallery/' + photo.path,
      src: 'images/thumbnail/' + photo.path,
      width: photo.thumbnail.width,
      height: photo.thumbnail.height,
    };
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loadingImages: false
    };
  }

  loadMoreImages(e) {
    const nearPageBottom = window.innerHeight + document.body.scrollTop > document.body.offsetHeight - 300;
    console.log('NB', nearPageBottom);
    if (nearPageBottom && !this.state.loadingImages) {
        this.setState({loadingImages: true});
        this.fetchAdditionalPhotos()
          .finally(() => {
            this.setState({loadingImages: false});
          });
    }
  }

  fetchAdditionalPhotos() {
    return fetchImages()
      .then(photos => {
        this.setState({
          photos: [...this.state.photos, ...formatPhotos(photos)]
        });
      });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.loadMoreImages.bind(this));
    this.fetchAdditionalPhotos();
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={containerStyle}>
          <Gallery photos={this.state.photos}/>
        </div>
      </div>
    );
  }
}

export default App;
