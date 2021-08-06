
import './App.css'
import React, {Component} from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'  
import axios from 'axios'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      allPosts: [],
      samplesPosts: [],
      page: 0
    }
  }
  componentDidMount() {
    //Getting the post and initializing the first sample.
    if(this.state.allPosts.length == 0){
      this.getAllPosts()
      //setSamplePostArray()
    }
  }

  setSamplePostArray(){
    let temporaryArray = []
    for(let i = 0; i < 20; i++){
      temporaryArray.push(this.state.allPosts[20 * this.state.page + i]);
    }
    this.state.samplesPosts = temporaryArray;
  }

  async getAllPosts(){
    try{
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/')
      this.setState({allPosts: response.data})
    }
    catch(error){
      console.log(error)
    }
  }

  render(){
    const columns =  [{
        Header: 'Minimalist-blog',
        columns : [
          {
            Header: 'Post title',
            accessor: 'title',
          },
          {
            Header: 'Number of comments',
            accessor: 'numberComment',
          },
        ],
      },
    ]
  
    return (
        <div className="App">
          <ReactTable defaultPageSize={20} columns={columns} data={this.state.allPosts} />
        </div>
    )
  }
}
