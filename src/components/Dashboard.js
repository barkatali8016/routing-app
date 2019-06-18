import React, { Component } from 'react'
import {NavLink,Route}from 'react-router-dom'
import AddPost from './dashboardComponent/AddPost';
import ManagePost from './dashboardComponent/ManagePost';
import ViewPost from './dashboardComponent/ViewPost';
import ViewAllPost from './dashboardComponent/ViewAllPost';
import Clock from './Clock';
import Support from './Support';
 class Dashboard extends Component {
  render() {
    return (
       
         <div> 
             <br/><br/>
            <div>
                 <h1>Wlcome to Dashboard</h1>
                 <NavLink to="/">Logout</NavLink><br/>
            </div>
             <br/>
                <NavLink to="/dashboard/addpost">Add Post</NavLink><br/>
                <NavLink to="/dashboard/managepost">Manage Post</NavLink><br/>
                <NavLink to="/dashboard/viewpost">View Post</NavLink><br/>
                <NavLink to="/dashboard/viewallpost">View All Post</NavLink><br/>
               
               
                <div>

                <Route path="/dashboard/addpost" component={AddPost}/>
                <Route path="/dashboard/managepost" component={ManagePost}/>
                <Route path="/dashboard/viewpost" component={ViewPost}/>
                <Route path="/dashboard/viewallpost" component={ViewAllPost}/>
                </div>

                <Clock render={(count,handleClicked)=>(<Support count={count} handleClicked={handleClicked}/>)}/>
        </div>
    
    )
  }
}

export default Dashboard
