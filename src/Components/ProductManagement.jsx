import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Faild to fetch products.", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      try{
        await axios.put(`http://localhost:3000/products/${editId}`,form)
        alert('Product Updated successfully.!');
      }
       catch (error) {
        console.log("Failed to update product.", error);
      }
    } else {
      try {
        await axios.post("http://localhost:3000/products", form);
        alert("Product Added successfully.!!");
      } catch (error) {
        console.log("Failed to add product.", error);
      }
    }
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({ name: p.name, price: p.price });
  };


  const handleDelete = async(id)=>{
    if(!id){
        setError("Product Not Found.!!");
    }
    try{
        await axios.delete(`http://localhost:3000/products/${id}`);
        alert('Product deleted successfully.!!');
    }
    catch (error) {
        console.log("Failed to delete product.", error);
    }
  }

  if (loading) return <h2>Loading..!!</h2>;
  if (error) return <h2>{error}</h2>;
  if (!products) return null;

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>

        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={()=>handleDelete(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default ProductManagement;
