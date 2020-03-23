import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Toast from "../component/Toast";
import $ from "jquery";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }

  bind = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Login = event => {
    event.preventDefault();
    let url = "http://localhost/onlen/public/user/auth";
    let form = new FormData();
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    axios
      .post(url, form)
      .then(response => {
        let logged = response.data.status;
        if (logged) {
          this.setState({ message: "Logged in!" });
          // saves token data to local storage
          localStorage.setItem("Token", response.data.token);
          // saves user login data to local storage
          localStorage.setItem("id_user", JSON.stringify(response.data.user.id_user));
          localStorage.setItem("role", JSON.stringify(response.data.user.role));
          // directs to data siswa page
          window.location = "/product";
        } else {
          this.setState({ message: "Login failed" });
        }
        $("#message").toast("show");
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container" style={{ width: "50%" }}>
        <div className="card my-2">
          <div className="card-header bg-primary">
            <h5 className="text-white">Login User</h5>
          </div>

          <div className="card-body">
            <Toast id="message" autohide="false" title="Informasi">
              {this.state.message}
            </Toast>
            <form onSubmit={this.Login}>
              <input
                type="text"
                className="form-control m-1"
                name="email"
                value={this.state.email}
                onChange={this.bind}
                required
                placeholder="Masukkan Email"
              />
              <input
                type="password"
                className="form-control m-1"
                name="password"
                value={this.state.password}
                onChange={this.bind}
                required
                placeholder="Masukkan Password"
              />
              <button className="mt-2 btn btn-block btn-primary" type="submit">
                <span className="fa fa-sign-in"></span> Login
              </button>
              <Link to="/register">
                Belum Punya Akun?
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
