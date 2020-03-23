import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Slide1 from '../image/GT.jpg';
// import Slide2 from '../image/okeh.jpg';
import Slide1 from '../image/slide1.jpg';
import Slide2 from '../image/slide2.jpg';
import ProductItem from './ProductItem';

export default class Product extends React.Component {
	constructor(props){
        super(props);
        this.state = {
            products: [],
            find: "",
            filter:""
        }
    }
		bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
}
   GetProducts = () => {
	    	let url = "http://localhost/onlen/public/products"
	    	axios.get(url)
	    	.then(res => {
	    			this.setState({products: res.data.products})
	    	})
	    	.catch(error => {
	    			console.log(error)
	    	})
    }

		Search = (e) => {
         if (e.keyCode === 13) {
             let url = "http://localhost/onlen/public/products"
             let form = new FormData()
             form.append("find", this.state.find)
             axios.post(url, form)
                 .then(res => {
                     this.setState({products: res.data.products})
                 })
                 .catch(error => {
                     console.log(error);
                 })
         }
     }

		 componentDidMount() {
        this.GetProducts()
    }



	render() {
		const renderData = this.state.products.map((item, id)=>{
			return (
				<ProductItem item={item} key={id}/>
			)
		})
		return (
			<div className=" container ">
			<div className="row">
									<div className="col-lg-3">
											<h1 className="my-4">React Shop</h1>
													<input type="text" className="form-control" name="find" value={this.state.find} onChange={this.bind} onKeyUp={this.Search} required placeholder="Pencarian.." />
													<hr></hr>
													{/* <h4>Category</h4>
													<form onSubmit={this.Filter}>
															<div className="form-group">
																	<select className="form-control" name="filter" value={this.state.value} onChange={this.bind} >
																			<option value="">Choose...</option>
																			<option value="locks">Locks</option>
																			<option value="iotm">IOTM</option>
																	</select>
															</div>
															<button type="submit" className="btn btn-info pull-right m-2"> Filter
															</button>
													</form> */}
									</div>
									<div className="col-lg-9">
											<div id="slideshow" className="carousel slide my-4" data-ride="carousel">
													<ol className="carousel-indicators">
															<li data-target="#slideshow" data-slide-to="0" className="active"></li>
															<li data-target="#slideshow" data-slide-to="1"></li>
													</ol>
													<div className="carousel-inner" role="listbox">
															<div className="carousel-item active">
																	<img className="d-block img-fluid" src={Slide1} alt="First slide" />
															</div>
															<div className="carousel-item">
																	<img className="d-block img-fluid" src={Slide2} alt="Second slide" />
															</div>
													</div>
													<a className="carousel-control-prev" href="#slideshow" role="button" data-slide="prev">
															<span className="carousel-control-prev-icon" aria-hidden="true"></span>
															<span className="sr-only">Previous</span>
													</a>
													<a className="carousel-control-next" href="#slideshow" role="button" data-slide="next">
															<span className="carousel-control-next-icon" aria-hidden="true"></span>
															<span className="sr-only">Next</span>
													</a>
											</div>

											<div className="row">
													{renderData}
													<hr></hr>
													<Link to="/checkout">
															<button className="btn btn-success float-right">
																	<span className="fa fa-check"></span> Checkout
															</button>
													</Link>
													<Link to="/cart">
															<button className="btn btn-primary float-right" style={{  marginRight: "10px" }}>
																	<span className="fa fa-cart-plus"></span> View Cart
															</button>
													</Link><br/><br/><br/>
											</div>
									</div>
							</div>
</div>
		);
	}
}
