import React, { Component } from "react";
//import {NavLink} from 'react-router-dom'
import { NavLink } from "react-router-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// import {image64toCanvasRef} from "./reusable"
class Register extends Component {
  constructor(props) {
    super(props);
    this.imgPreviewCanvas = React.createRef();
    this.state = {
      userDetails: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        age: "",
        onetimepass:''
       
      },
      src: null,
      crop: {
        aspect: 1 / 1,
        width: 150,
        x: 0,
        y: 0
      },
      proccesing: false,
      changeUpdateStatus: false,
      croppedImageUrl: "",
      errMsg: {
        fnameMsg: "",
        lnameMsg: "",
        emailMsg: "",
        passwordMsg: "",
        confirmPasswordMsg: "",
        phoneMsg: "",
        ageMsg: ""
      }
    };
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      window.$("#imageModal").modal("show");
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, crop) => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl }, () => {
        console.log(croppedImageUrl);
      });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      let dataURL = canvas.toDataURL("image/jpeg");
      resolve(dataURL);
    });
  }

  handleUpdateCompanyLogo = () => {
    if (this.state.croppedImageUrl != "") {
      this.setState({ proccesing: true }, () => {
        window.$("#imageModal").modal("hide");
        this.setState({
          changeUpdateStatus: true,
          proccesing: false
        });
      });
    }
  };
  //get input value in on change method
  getUserDetails = e => {
    var emailReg = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    var phoneReg = RegExp(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    );
    // alert("hi")
    let form_data = this.state.userDetails;
    form_data[e.target.name] = e.target.value;
    let newerrMsg = this.state.errMsg;

    let name = e.target.name;
    let val = e.target.value;
    switch (name) {
      case "fname":
        newerrMsg.fnameMsg = val.length < 3 ? "Minimum 3 char require" : "";
        break;
      case "lname":
        newerrMsg.lnameMsg = val.length < 3 ? "Minimum 3 char require" : "";
        break;
      case "email":
        newerrMsg.emailMsg = emailReg.test(val) ? "" : "Invalid Email";
        break;
      case "password":
        newerrMsg.passwordMsg = val.length < 8 ? "Minimum 8 char require" : "";
        break;
      case "confirmPassword":
        newerrMsg.confirmPasswordMsg =
          val.length < 8 ? "Minimum 8 char require" : "";
        break;
      case "phone":
        newerrMsg.phoneMsg = phoneReg.test(val) ? "" : "Invalid phone number";
        break;
      case "age":
        //    newerrMsg.ageMsg=val.value == null ?'Field Required':''
        newerrMsg.ageMsg = val.length === 0 ? "Field Required" : "";
        break;
      default:
    }
    //    if(val.length < 3 ){
    //     this.setState({errMsg:'length must be greather than 3'});
    //    // console.log(`Value of ${form_data[e.target.name]} = ${val}`);
    //    }else{
    //     this.setState({errMsg:''});
    //        //console.log(`length must be greather than 3`)
    //    }

    // alert(form_data.fname);
    //console.log(form_data);

    this.setState({
      userDetails: form_data,
      errMsg: newerrMsg
    });
  };
  registerUser = event => {
    event.preventDefault();

    let data = this.state.userDetails;
    let errmsg = this.state.errMsg;
    if (data.fname === "") {
      errmsg.fnameMsg = "Please Fill the Above Field";
    } else if (data.lname === "") {
      errmsg.fnameMsg = "";
      errmsg.lnameMsg = "Please Fill the Above Field";
    } else if (data.email === "") {
      errmsg.lnameMsg = "";
      errmsg.emailMsg = "Please Fill the Above Field";
    } else if (data.password === "") {
      errmsg.emailMsg = "";
      errmsg.passwordMsg = "Please Fill the Above Field";
    } else if (data.confirmPassword === "") {
      errmsg.passwordMsg = "";
      errmsg.confirmPasswordMsg = "Please Fill the Above Field";
    } else if (data.phone === "") {
      errmsg.confirmPasswordMsg = "";
      errmsg.phoneMsg = "Please Fill the Above Field";
    } else if (data.age === "") {
      errmsg.phoneMsg = "";
      errmsg.ageMsg = "Please Fill the Above Field";
    } else {
      errmsg.ageMsg = "";

      fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json, plain/text, */*",
          "Content-type": "application/json"
        },

        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

      // console.log("123");
      //console.log(this.state.userDetails);
    }

    this.setState({
      errMsg: errmsg
    });

    //  alert("register");
    // console.log(this.state.userDetails);
  };

  render() {
    // console.log(this.state.profile_img);
    const src = this.state.croppedImageUrl;
    return (
      <div className="container">
        <h1>Register Page</h1>
        <form onSubmit={this.registerUser}>
          <div>
            {this.state.changeUpdateStatus ? (
              <div>
                <img src={src} alt="profile image" className="img-thumbnail" />
              </div>
            ) : (
              "Image Will Shown Here"
            )}
          </div>
          <div>
            <label>Profile Picture:</label>
            <input
              accept="image/*"
              type="file"
              name="profile_img"
              multiple={false}
              // value={this.state.userDetails.fname}

              onChange={this.onSelectFile}
            />
            <br />
            <small>
              <span>{this.state.errMsg.fnameMsg}</span>
            </small>
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="fname"
              value={this.state.userDetails.fname}
              placeholder="First Name"
              onChange={this.getUserDetails}
            />
            <br />
            <small>
              <span>{this.state.errMsg.fnameMsg}</span>
            </small>
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lname"
              value={this.state.userDetails.lname}
              placeholder="Last Name"
              onChange={this.getUserDetails}
            />
            <br />
            <small>
              <span>{this.state.errMsg.lnameMsg}</span>
            </small>
          </div>
          <div>
            <label>E-mail:</label>
            <input
              type="text"
              name="email"
              value={this.state.userDetails.email}
              placeholder="Email"
              onChange={this.getUserDetails}
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
              value={this.state.userDetails.password}
              placeholder="Password"
              onChange={this.getUserDetails}
            />
            <br />
            <small>
              <span>{this.state.errMsg.passwordMsg}</span>
            </small>
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={this.state.userDetails.confirmPassword}
              placeholder="Confirm Password"
              onChange={this.getUserDetails}
            />
            <br />
            <small>
              <span>{this.state.errMsg.confirmPasswordMsg}</span>
            </small>
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={this.state.userDetails.phone}
              placeholder="mobile"
              onChange={this.getUserDetails}
            />
            <br />
            <small>
              <span>{this.state.errMsg.phoneMsg}</span>
            </small>
          </div>
          <div>
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={this.state.userDetails.age}
              placeholder="age"
              onChange={this.getUserDetails}
            />
            <br />
            <small>
              <span>{this.state.errMsg.ageMsg}</span>
            </small>
          </div>
          <div>
            <button className="btn btn-success" type="Submit">
              Register
            </button>
          </div>
        </form>
        <NavLink to="/">Already have an account?</NavLink>
        <div
          className="modal fade"
          id="imageModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Crop Profile Image
                </h4>
              </div>
              <div className="modal-body">
                {this.state.src && (
                  <ReactCrop
                    src={this.state.src}
                    crop={this.state.crop}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                )}
                {/* {this.state.croppedImageUrl && (
                            <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.croppedImageUrl} />
                            )} */}
              </div>
              <div className="modal-footer">
                {this.state.proccesing ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={true}
                  >
                    Proccesing...
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleUpdateCompanyLogo}
                  >
                    Uplaod
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

// function addPost(event){
//     event.preventDefault();
//  let title= document.getElementById('titleId').value;
//  let body= document.getElementById('bodyId').value;
// // console.log(`${title} ${body}`);
// fetch('https://jsonplaceholder.typicode.com/posts',{
//     method:'POST',
//     headers:{
//         'Accept':'application/json, plain/text, */*',
//         'Content-type':'application/json'
//     },
//     body:JSON.stringify({title:title,body:body})
//     })
//     .then(res=>res.json())
//     .then(data=>console.log(data))
//     .catch(err=>console.log(err))
// }
