import './App.css'
import React, {Component} from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'  
import axios from 'axios'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      allPosts: []
    }
  }

  componentDidMount() {
    // Getting the post and initializing the first sample.
    if(this.state.allPosts.length === 0){
      this.getAllPosts()
    }
  }

  // Asynchronous function that return the number of comments for each post.
  async getNumberCommentForEveryPost(){
    // Make sure to wait for the promise to finish and to become result.
    await Promise.all(this.state.allPosts.map(async (element) =>{
      try{
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/comments?postId=' + element.id)
        element.numberComment = response.data.length
      }catch(error){
        console.log(error)
      }
    }))
    this.setState({allPosts: this.state.allPosts})
  }

  // Asynchronous function that return all posts from the api
  async getAllPosts(){
    try{
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/')
      this.setState({allPosts: response.data})
      this.getNumberCommentForEveryPost()
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
  
    // ReactTable is a lightweight data table that work with hooks.
    return (
        <div className="App">
          <ReactTable defaultPageSize={20} columns={columns} data={this.state.allPosts} />
        </div>
    )
  }
}
