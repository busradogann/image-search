import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import logo from '../logo.svg';

import '../style/Index.css';

import styled from 'styled-components';

const API = "https://api.unsplash.com/collections/featured/?client_id=930640e0b7713dca3ab1a0751b6f4b4741d1dfca6a72be2a071cddd6c1d0c92c";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      collection: null,
      collections: []
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onCollectionChange = this.onCollectionChange.bind(this);
  }

  componentDidMount(){
    let url = `${API}&per_page=30`

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ collections: data }));
  }

  onQueryChange (e) {
    this.setState({query: e.target.value});
  }

  onCollectionChange (e) {
    this.setState({collection: e.target.value});
  }

  render() {
    return (
      <div className="App-header">
   
        <img src={logo} className="App-logo" />
        <input onChange={this.onQueryChange} className="Input-query" placeholderClassName="Placeholder-query" placeholder="Query"/>
        
        <div className="Select-collections-back"></div>
        <select onChange={this.onCollectionChange} className="Select">
          {this.state.collections.map(collection =>
            <option key={collection.id} value={collection.id}>{collection.title}</option>
            )}
        </select>
        
        <button className="Button" onSubmit={`/${this.state.query}/${this.state.collection}`}>
        <Link to={`/${this.state.query}/${this.state.collection}`} className="Button-search" activeClassName="active">
          SEARCH
        </Link>
        </button>
       
      </div>
    );
  }
}

export default Index;
