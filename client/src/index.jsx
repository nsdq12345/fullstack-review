import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {

    $.ajax({
      method: 'GET',
      url: '/repos'
    }).done((data) => {
      this.setState({
        repos: data
      })
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/repos',
      data: JSON.stringify({term: term})
    })
    .done((data) => {
      console.log('results:', data)
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));