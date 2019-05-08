import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import logo from '../logo.svg';

import styled from 'styled-components';

const IndexWrapper = styled.div`
  height: 100%;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #050217;
`

const SearchContainer = styled.div`
  width: 30vh;
`

const QueryInput = styled.input`
  width: 100%;
  background: #FFFFFF;
  border-radius: 4px;
  font-size: 16px;
  color: #050417;
  padding: 8px;
  margin-top: 20px;
  border: none;
`

const CollectionsInput = styled.select`
  width: 100%;
  background: #FFFFFF;
  border-radius: 4px;
  font-size: 16px;
  color: #050417;
  padding: 8px;
  margin-top: 20px;
  border: none;
`

const SearchButton = styled(Link)`
  width: 95%;
  color: #FFFFFF;
  display: block;
  background: #2A2B8D;
  border-radius: 25px;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.1em;
  padding: 12px;
  margin-top: 20px;
  text-align: center;
`


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
    let url = `/${this.state.query}`
    if (this.state.collection !== null) {
      url = `${url}/${this.state.collection}`;
    }

    return (
      <IndexWrapper>
        <SearchContainer>
          <img src={logo} />
          <QueryInput onChange={this.onQueryChange} placeholder="Query"/>

          <CollectionsInput onChange={this.onCollectionChange}>
            <option disabled selected>Collection</option>
            {this.state.collections.map(collection =>
              <option key={collection.id} value={collection.id}>{collection.title}</option>
              )}
          </CollectionsInput>

          <SearchButton to={url}>
            SEARCH
          </SearchButton>

        </SearchContainer>
      </IndexWrapper>
    );
  }
}

export default Index;
