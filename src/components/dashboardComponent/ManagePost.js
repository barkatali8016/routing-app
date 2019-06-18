import React, { Component } from 'react'

 class ManagePost extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      data:[]
    }
  }
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response=>response.json())
    .then(data=>this.setState({data:data}))
    .catch(err=>console.log(err))
  }
  render() {

    
    return (
      <div>
           <div>
              <h3>Manage Post</h3>
           </div>
          <form>
               <table border='3'>
            <tbody>
                <tr>
                    <td><h1>Title</h1></td>
                    <td><h1>Description</h1></td>
                    <td><h1>Action</h1></td>
                </tr>
                {this.state.data.map((obj, i)=> {
                        return (
                        <tr key={i}>
                            <td><h5>{obj.title}</h5></td>
                            <td>{obj.body}</td> 
                            <td><button type='button'>Delete</button></td>
                        </tr>
                        )
                    })
                }
               
            </tbody>
            </table>
        </form>

      </div>
    )
  }
}

export default ManagePost
//onClick={()=>this.props.deleteArrMethod(i)}
// function getApi  (){
    //   //  console.log('textbtn');
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then((response)=>response.json())
    //     .then((posts)=>{
    //         let output=`<h1>Posts</h1>`;
    //         posts.map((post)=>{
    //             output +=`
    //             <div>
    //                 <h2>${post.title}</h2>
    //                 <p>${post.body}</p>
    //             </div>   
    //             `
    //         });
    //       document.getElementById('output').innerHTML=output;
    //     })
    //     .catch(err=>console.log(err));
        
    // }