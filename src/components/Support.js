import React, { Component } from 'react'

 class Support extends Component {
  render() {
    const {count,handleClicked}=this.props;
    return (
      <div>
       <button onClick={handleClicked} >Clicked {count}</button>
      </div>
    )
  }
}

export default Support
