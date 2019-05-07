import React, { Component } from 'react';

import styled from 'styled-components';


const API = "https://api.unsplash.com/search/photos/?client_id=930640e0b7713dca3ab1a0751b6f4b4741d1dfca6a72be2a071cddd6c1d0c92c";


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: this.props.match.params.query,
      collection: this.props.match.params.collection,
      results: []
    };
  }

  componentDidMount(){
    let url = `${API}&query=${this.state.query}&per_page=30`
    if (this.state.collection !== undefined) {
      url = `${url}&collections=${this.state.collection}`
    }

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ results: data.results }));
  }

  render() {
    return (

      <div>
        {this.state.results.map(result =>
          <div key={result.id}>
          <a href={result.urls.full}>
            <img src={result.urls.small}/>
          </a>
        </div>
          )}
          </div>

    );
  }
}

export default Search;
