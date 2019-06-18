import React, { Component } from 'react'

 class AddPost extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        title:"",
        description:""
     }
   }
   
   addValue = (event)=>{
     
    this.setState({
        [event.target.name]  : event.target.value,
        [event.target.name]  : event.target.value,
      })


    // console.log(this.state.title);
    // console.log(this.state.description);
    //console.log('barkat')
   }

   getValue=()=>{
    console.log(this.state.title);
    console.log(this.state.description);
   }

  render() {
    return (
      <div>
        <h3>Add New Post</h3>
        <br/>
         <div>
         <label>Title</label>
           <input type="text" name="title" placeholder="add title" onChange={this.addValue}/>
       </div>
       <br/>
         <div>
         <label>Description</label>
           <input type="text" name="description" placeholder="add description" onChange={this.addValue} />
       </div>
       <div>
        
           <input type="button" value="Add" onClick={this.getValue}/>
       </div>
      </div>
    )
  }
}

export default AddPost
