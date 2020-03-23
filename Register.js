import React,{Component} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import Toast from "../component/Toast";

export default class Product extends React.Component {

    constructor() {
        super();
        this.state = {
            action:"insert",
            id_user:"",
            nama_user:"",
            email:"",
            password:"",
            role:"User",
            message:""
        }
    }

    bind = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    Save = (event) => {
        event.preventDefault();
        let url = "http://localhost/onlen/public/user/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("nama_user", this.state.nama_user);
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        form.append("role", this.state.role);
        // form.append("img_user", this.state.img_user, this.state.img_user.name);
        axios.post(url, form)
  
        .then(response => {
          this.setState({message: response.data.message});
          $("#message").toast("show");
          window.location = "/login";
        })
        .catch(error => {
          console.log(error);
        });
      }

    render() {
        return (
          <div className="wrapper">
            <div className="form-wrapper">
              <h1>Register</h1>
               <form onSubmit={this.Save}>
                 <div className="nama">
                   <label htmlfor="nama">Nama</label>
                   <input 
                   type="text" 
                   className="" 
                   placeholder="nama" 
                   type="text" 
                   name="nama_user"
                   value={this.state.nama_user} onChange={this.bind} required
                   >
                   </input>
                 </div>
                 <div className="email">
                   <label htmlfor="email">Email</label>
                   <input
                   type="text" 
                   className="" 
                   placeholder="Email" 
                   type="text" 
                   name="email" 
                   value={this.state.email} onChange={this.bind} required
                   >
                   </input>
                 </div>
                 <div className="password">
                   <label htmlfor="password">Password</label>
                   <input 
                   type="password" 
                   className="" 
                   placeholder="Password" 
                   type="password" 
                   name="password" 
                   value={this.state.password} onChange={this.bind} required
                   >
                   </input>
                 </div>
                 {/* <div className="password">
                   <label htmlfor="password">Verifikasi Password</label>
                   <input 
                   type="password" 
                   className="" 
                   placeholder="Verifikasi Password" 
                   type="password" 
                   name="password" 
                   value={this.state.password} onChange={this.bind}
                   >
                   </input>
                 </div> */}
                 <br/>
                 <button type="submit" className="btn btn-block btn-success">
                  <span className="fa fa-check"></span> Simpan
                </button>
               </form>
               <Link to="/login"></Link>
               <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
            </div>
          </div>
        //   <div className="container" style={{width: 24 + "rem", paddingTop : 6 + '%'}}>
        // <div className="card-body">
        //   <div className="# ">
        //     <h2 className="#" style={{textAlign: "center"}}>Register</h2>
        //   </div>
        //   <div className="card-body">
        //     <form onSubmit={this.Save}>
        //        Nama
        //        <input type="text" className="form-control" name="nama_user"
        //          value={this.state.nama_user} onChange={this.bind} required />
        //        Email
        //        <input type="text" className="form-control" name="email"
        //          value={this.state.email} onChange={this.bind} required />
        //        Password
        //        <input type="password" className="form-control" name="password"
        //          value={this.state.password} onChange={this.bind} required />
        //        Verifikasi Password
        //        <input type="password" className="form-control" name="password"
        //          value={this.state.password} onChange={this.bind} required />
        //        {/* Foto
        //        <input type="file" className="form-control" name="img_user"
        //         onChange={this.bindImage} /> */}
        //     <br/>
        //       <button type="submit" className="btn btn-block btn-success">
        //          <span className="fa fa-check"></span> Simpan
        //        </button>
        //       </form>
        //       <Link to="/login">
                  
        //       </Link>
              
        //   </div>
        // </div>
        );
    }
}
