import React, { Component } from 'react'

 class ViewPost extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      posts:[]
    }
  }
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response=>response.json())
    .then(data=>this.setState({posts:data}))
    .catch(err=>console.log(err))
    
  }
  render() {
   // console.log(this.state.posts);
    return (
      <div>
           <h1>ViewPost</h1>
            <br/>
            <br/>
           <div>
                  {
                    this.state.posts.map((data,i)=>{
                      return (
                        <div key={i}>
                          <h2>Title</h2><div>{data.title}</div>
                          <h2>Description</h2><div>{data.body}</div>
                         
                        </div>
                      )
                    })
                  }
           </div>
      </div>
    )
  }
}

export default ViewPost
