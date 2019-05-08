import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Gallery from 'react-grid-gallery';

import logo2 from '../logo2.svg';



const Navbar = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  min-height: 120px;
  background: #050417;

  flex-direction: column;
  @media (min-width: 768px) {
    align-items: center;
    padding: 20px 40px;
    flex-direction: row;
  }
`

const Logo = styled.div`
  height: 100%;
`

const QueryInput = styled.input`
  height: 50px;
  width: 90%;
  background: #FFFFFF;
  border-radius: 4px;
  border: none;
  margin-top: 10px;
  @media (min-width: 768px) {
    margin-left: 50px;
  }
`

const CollectionsInput = styled.select`
  height: 50px;
  width: 90%;
  border: none;
  margin-top: 10px;
  @media (min-width: 768px) {
    margin-left: 20px;
  }
`

const SearchButton = styled(Link)`
  width: 65%;
  text-align: center;
  color: #FFFFFF;
  display: block;
  background: #2A2B8D;
  border-radius: 25px;
  font-size: 14px;
  padding: 15px 50px;
  margin-top: 10px;
  @media (min-width: 768px) {
    height: 20px;
    width: 100px;
    width: max-content;
    margin-left: 20px;
  }
`

const Images = styled.div`

`


const APICollections = "https://api.unsplash.com/collections/featured/?client_id=930640e0b7713dca3ab1a0751b6f4b4741d1dfca6a72be2a071cddd6c1d0c92c";
const API = "https://api.unsplash.com/search/photos/?client_id=930640e0b7713dca3ab1a0751b6f4b4741d1dfca6a72be2a071cddd6c1d0c92c";


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: this.props.match.params.query,
      collection: this.props.match.params.collection,
      results: [],
      collections: []
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onCollectionChange = this.onCollectionChange.bind(this);
  }

  componentDidMount(){
    let urlCollections = `${APICollections}&per_page=30`

    let url = `${API}&query=${this.state.query}&per_page=10`
    if (this.state.collection !== undefined) {
      url = `${url}&collections=${this.state.collection}`
    }

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ results: data.results }));

      fetch(urlCollections)
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
      <div>
        <Navbar>
          <Logo>
            <img src={logo2} style={{height: '70px'}} />
          </Logo>

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
        </Navbar>

        <Images>
          <div className="Row">
            <div className="Column">
            {this.state.results.map(result =>
              <div key={result.id}>
              <a href={result.urls.full}>
                <img src={result.urls.small} className="image"/>
              </a>
              </div>
            )}
            </div>
          </div>
        </Images>
          
      </div>

    );
  }
}

export default Search;