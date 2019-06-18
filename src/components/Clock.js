import React, { Component } from 'react'

 class Clock extends Component {
     constructor(props) {
       super(props)
     
       this.state = {
          count:0
       }
     }
     
    handleClicked=()=>{
        this.setState(prevState=> {
            return {count:prevState.count+1}})
    }
  render() {
    return (
      <div>
            
         {this.props.render(this.handleClicked,this.state.count)}
          {/* <button onClick={this.handleClicked}>Clicked {this.state.count} Times</button> */}
      </div>
    )
  }
}

export default Clock
