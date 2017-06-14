import React from "react";
import NavBar from "../components/NavBar";
import Photos from "../components/Photos";
import {fetchJSON} from '../utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    fetchJSON('/api/images/')
      .then(photos => {
        this.setState({
          photos
        })
      })
  }

  render() {
    return (
      <div>
        <NavBar />
        <Photos photos={this.state.photos}/>
      </div>
    );
  }
}

export default App;
