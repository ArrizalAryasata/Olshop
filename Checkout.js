import React, { Component } from 'react'
import $ from "jquery";
import axios from "axios";


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carts: [],
      num: 0,
      total: 0,
      data_pengiriman: [],
            id_pengiriman: "",
            nama_penerima: "",
            kode_pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
            message: "",
            action: "",
            find: "",
            message: ""
    }


    }


  getCarts = () => {
    let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
let total = 0
let num = 0
items.forEach(item => {
  total += item.total
  num += item.stock
});
this.setState({
  carts: items,
  num: num,
  total: total
});


  }

  componentDidMount() {
    this.getCarts()
    this.get_alamat();
  }

  removeFromCart = (product) => {
    let carts = JSON.parse(localStorage.getItem('cart'));
    let cart = carts.filter(item => item.id !== product.id );
    localStorage.setItem('cart', JSON.stringify(cart));
    this.getCarts()


  }

  get_alamat = () => {
    let id = JSON.parse(localStorage.getItem('id_user'))
    let url = "http://localhost/onlen/public/alamat/"+id;
    axios.get(url)
    .then(response =>{
        this.setState({
            data_pengiriman: response.data.data_pengiriman,
        });
        $("#loading").toast("hide");
    })
    .catch(error => {
        console.log(error);
    });
}
    
    render(){
      const { carts, num, total, data_pengiriman } =  this.state;
      console.log(data_pengiriman)
        return(
            <div className="container">
        <div className="py-5 text-center">
          
          <h2>Checkout form</h2>
          
        </div>
        
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">{num}</span>
            </h4>

            <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sub Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
            <tbody>
          {carts.map((product, index) =>
              <tr key={index}>
                <td>
                  <h4 className="text-capitalize font-weight-bold">{product.name}</h4>
                  <h6 className="card-text"><small>price: </small>Rp{product.price}</h6>
                </td>
                <td>
                  <h5><span className="badge badge-secondary">{product.stock}</span></h5>
                </td>
                <td>
                  <h5>
                  <span className="badge badge-secondary">Rp. {product.total}</span>
                  </h5>
                </td>
                <td>
                <button className="btn btn-sm btn-warning"
                  onClick={() => this.removeFromCart(product)}><span className="fa fa-trash"></span> Remove</button>
                </td>
              </tr>
            )
          }
          </tbody>
          </table>
            {/* <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                <h6 className="text-capitalize font-weight-bold">ll</h6>
                  <small className="text-muted">Brief description</small>
                </div>  
                <span className="text-muted">$12</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Second product</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$8</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Third item</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$20</strong>
              </li>
            </ul> */}
          </div>
          
          {this.state.data_pengiriman.map((item) => {
            return(
          <div className="col-md-8 order-md-1">
            
            <div className="container">
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label htmlFor="country">Alamat</label>
                  <select className="custom-select d-block w-100" id="country" required>
                    <option value>Choose...</option>
                    <option>{item.jalan}</option>
                  </select>
                  <br/>
                  <button className="btn btn-primary btn-md" type="submit">Continue to checkout</button>
                </div>
              </div>
              </div>
            
          </div>
          );
        })}
        </div>
        
        
      </div>
    );
  }

        
    }

export default Checkout