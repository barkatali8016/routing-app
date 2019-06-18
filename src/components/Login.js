import React, { Component } from "react";
import { NavLink,Redirect } from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: {
        email: "",
        password: ""
      },
      errMsg: {
        emailMsg: "",
        passwordMsg: ""
      },
      redirect: false,
      responseData:{
        data:[],
        msg:"",
        success:0
      }
    };
  }

  getValue = e => {

    let emailReg = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let form_data = this.state.userDetails;
    form_data[e.target.name] = e.target.value;
    let newerrMsg = this.state.errMsg;

    let name = e.target.name;
    let val = e.target.value;
    //console.log(val);
  //  console.log(e.target);
   // console.log(e.target);
    //console.log(val)

    switch (name) {
      case "email":
      newerrMsg.emailMsg = emailReg.test(val) ? "" : "Invalid Email";
        break;
      case "password":

        newerrMsg.passwordMsg = val.length < 8 ? "Minimum 8 char require" : "";

        break;
      default:
    }

    this.setState({
      userDetails: form_data,
      errMsg: newerrMsg
    });
  };

  validateLoginData = e => {
    e.preventDefault();
   // console.log(this.state.userDetails);
    let data=this.state.userDetails;
    let errmsg=this.state.errMsg;
    if(data.email === ""){
        errmsg.emailMsg="Please Fill the Above Field"
    }else if(data.password === ""){
        errmsg.fnameMsg="";
        errmsg.passwordMsg="Please Fill the Above Field"
    }else{
        errmsg.lnameMsg="";

        fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          headers: {
            "Accept": "application/json, plain/text, */*",
            "Content-type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>
          {
            this.setState({responseData:data})
            // console.log(data);
           // console.log(data.success);
            if(data.success ==1){
            //   this.setState({
            //    redirect:true
            // })
            console.log(data.data);
            this.props.history.push(
              '/logintwostep',
              {
                _id : data.data,
              }
            );
            }else{
              console.log(data.msg)
            }

            if(data.success ===3){
              //   this.setState({
              //    redirect:true
              // })
              console.log(data.data);
              this.props.history.push(
                '/dashboard',
                {
                  _id : data.data,
                }
              );
              }else{
                console.log(data.msg)
              }
          })
        .catch(err=>console.log(err))
  
    }

    this.setState({
      errMsg:errmsg
  })
  };

  render() {
    // if(this.state.redirect){
    //   return <Redirect to='/dashboard' />
    // }
    return (
      <div>
        <div>
          <h1>Login Page</h1>
          <NavLink to="/register">
            <h3>Create New Account</h3>
          </NavLink>
        </div>
        <form>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.getValue}
            />
            <br />
            <small>
              <span>{this.state.errMsg.emailMsg}</span>
            </small>
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.getValue}
            />
            <br />
            <small>
              <span>{this.state.errMsg.passwordMsg}</span>
            </small>
          </div>
          <div>
            {this.state.responseData.msg!=""?<span>{this.state.responseData.msg}</span>:''}
          </div>
          <div>
            <button type="submit" onClick={this.validateLoginData}>
              Login
            </button>
            {/* <NavLink to="/dashboard">Login</NavLink> */}
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
