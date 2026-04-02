import axios from 'axios';
import React, { useState } from 'react'

const ProductManagement = () => {

  const [products,setProducts] = useState([]);

  const [form,setForm] = useState({
    name:"",
    price:""
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      await axios.post('http://localhost:3000/products',form);
      alert('Product Added successfully.!!');
    }
    catch(error){
      console.log("Failed to add product.",error);
    }


  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' value={form.name} onChange={handleChange} placeholder='Name' />
        <input type="text" name='price' value={form.price} onChange={handleChange} placeholder='Price' />
        <button>Add Product</button>
      </form>
    </div>
  )
}

export default ProductManagement