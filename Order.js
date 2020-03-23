import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import Navbar from '../component/Navbar';
class Order extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
            id_order: "",
            nama_user: "",
            alamat: "",
            total: "",
            bukti_bayar: "",
            status: "",
            detail_order: "",
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
        $("#modal_order").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            id_order: "",
            nama_user: "",
            alamat: 0,
            total: "",
            bukti_bayar: null,
            status: "",
            detail_order: ""
        });
    }
    // fungsi untuk membuka form edit data
    Edit = (item) => {
        // membuka modal
        $("#modal_products").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id_order: item.id_order,
            nama_user: item.nama_user,
            alamat: item.alamat,
            total: item.total,
            bukti_bayar: null,
            status: "",
            detail_order: "",
        });
    }
    get_order = () => {
        // $("#loading").toast("show");
        let url = "http://localhost/onlen/public/order";
        axios.get(url)
        .then(response => {
            this.setState({order: response.data.order});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Drop = (id_order) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/onlen/public/order/drop/"+id_order;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_order();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    componentDidMount = () => {
      this.get_order();

    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-danger">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Order</h4>
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
                                    <th>ID ORDER</th>
                                    <th>USER</th>
                                    <th>ALAMAT</th>
                                    <th>TOTAL</th>
                                    <th>PAYMENT</th>
                                    <th>STATUS</th>
                                    <th>DETAIL ORDER</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.order.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id_order}</td>
                                            <td>{item.nama_user}</td>
                                            <td>{item.alamat}</td>
                                            <td>{item.total}</td>
                                            <td><img src={'http://localhost/onlen/public/images/' + item.image}
                                                   alt={item.image} width="200px" height="200px"/></td>
                                            <td>{item.status}</td>
                                            <td>{item.detail_order}</td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-check"></span>Simpan
                                                </button>
                                                <button className="m-1 btn btn-sm btn-primary"
                                                    onClick={() => this.Drop(item.id)}>
                                                    <span className="fa fa-trash"></span>Hapus
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

export default Order;
