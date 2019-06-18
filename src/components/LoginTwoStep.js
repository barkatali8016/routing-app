import React, { Component } from "react";

export class LoginTwoStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: "",
      _id: "",
      otpErrMsg: "",
      isDisable: true
    };
  }
  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state._id) {
        this.setState({ _id: this.props.location.state._id });
      }
    }
  }
  getValue = e => {
    let errMsg = this.state.otpErrMsg;
    let otp = e.target.value;

    if (otp.length != 4) {
      errMsg = "Otp Must be 4 integer";
      this.setState({ isDisable: true });
    } else {
      errMsg = "";
      this.setState({ isDisable: false });
    }

    this.setState({ otp: otp, otpErrMsg: errMsg });

    console.log(otp);
  };
  handleSubmit = () => {
    let formData = {
      _id: this.state._id,
      otp: this.state.otp
    };
    fetch("http://localhost:3000/api/user/logintwostep", {
      method: "POST",
      headers: {
        Accept: "application/json, plain/text, */*",
        "Content-type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        //   this.setState({responseData:data})
        //   // console.log(data);
        //  // console.log(data.success);
        if (data.success===3) {
          //   this.setState({
          //    redirect:true
          // })
          console.log(data.data);

          this.props.history.push("/dashboard", {
            _id: data.data
          });
        } else {
          console.log(data.msg);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <div>
          <label>Enter Your One Time Password:</label>
          <input
            type="text"
            name="otp"
            placeholder="One Time Password"
            onChange={this.getValue}
          />
          <br />
          <small>
            <span>{this.state.otpErrMsg}</span>
          </small>
        </div>
        {/* <div>
          {this.state.responseData.msg != "" ? (
            <span>{this.state.responseData.msg}</span>
          ) : (
            ""
          )}
        </div> */}
        <div>
          <button
            type="submit"
            onClick={this.handleSubmit}
            disabled={this.state.isDisable}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginTwoStep;
