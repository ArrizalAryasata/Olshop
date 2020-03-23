import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import Navbar from '../component/Navbar';
class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            id: "",
            name: "",
            stock: 0,
            price: "",
            description: "",
            image: null,
        }
        // jika tidak terdapat data token pada lokal storage
        // if(!localStorage.getItem("Token")){
        //     // direct ke halaman login
        //     // window.location = "/login";
        // }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    // fungsi untuk membuka form tambah data
    Add = () => {
        // membuka modal
        $("#modal_products").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            id: "",
            name: "",
            stock: "",
            price: "",
            description: "",
            image: null
        });
    }
    // fungsi untuk membuka form edit data
    Edit = (item) => {
        // membuka modal
        $("#modal_products").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id: item.id,
            name: item.name,
            stock: item.stock,
            price: item.price,
            description: item.description,
            image: item.image
        });
    }
    get_products = () => {
        // $("#loading").toast("show");
        let url = "http://localhost/onlen/public/products";
        axios.get(url)
        .then(response => {
            this.setState({products: response.data.products});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/onlen/public/products/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_products();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    componentDidMount = () => {
      this.get_products();

    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");
        // menutup form modal
        $("#modal_products").modal("hide");
        let url = "http://localhost/onlen/public/products/save";
        let form = new FormData();
        form.append("action",this.state.action);
        form.append("id", this.state.id);
        form.append("name", this.state.name);
        form.append("stock", this.state.stock);
        form.append("price",this.state.price);
        form.append("description", this.state.description);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_products();
        })
        .catch(error => {
            console.log(error);
        });
    }
    search = (event) => {
        if (event.keyCode === 13 ){
            // $("#loading").toast("show");
            let url = "http://localhost/onlen/public/products";
            let form = new FormData();
            form.append("find",this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({products: response.data.products});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-danger">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Produk</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                    placeholder="Pencarian..." />
                            </div>
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin faspinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Stok</th>
                                    <th>Harga</th>
                                    <th>Deskripsi</th>
                                    <th>Gambar</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.products.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.stock}</td>
                                            <td>{item.price}</td>
                                            <td>{item.description}</td>
                                            <td><img src={'http://localhost/onlen/public/images/' + item.image}
                                                   alt={item.image} width="200px" height="200px"/></td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-primary"
                                                    onClick={() => this.Drop(item.id)}>
                                                    <span className="fa fa-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* tombol tambah */}
                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>

                        {/* form modal siswa*/}
                        <Modal id="modal_products" title="Form Produk" bg_header="primary"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Nama Barang
                                <input type="text" className="form-control" name="name"
                                  value={this.state.name} onChange={this.bind} required />
                                Stok
                                <input type="text" className="form-control" name="stock"
                                  value={this.state.stock} onChange={this.bind} required />
                                Harga
                                <input type="text" className="form-control" name="price" value={this.state.price}
                                  onChange={this.bind} required />
                                Deskripsi
                                <input type="text" className="form-control" name="description" value={this.state.description}
                                  onChange={this.bind} required />
                                Gambar
                                <tr>
                                  <input type="file" className="file-control" name="image"
                                    onChange={this.bindImage} required />
                                </tr>
                                <button type="submit" className="btn btn-info pull-right m-2">
                                  <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
export default Products
