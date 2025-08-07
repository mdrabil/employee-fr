import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CreateMedicine } from '../api/MedicineApi';
import { useNavigate } from 'react-router-dom';

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    quantity: '',
    mfgDate: '',
    expireDate: '',
  });
const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, type, price, quantity, mfgDate, expireDate } = formData;

    if (!name || !type || !price || !quantity || !mfgDate || !expireDate) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await CreateMedicine(formData);
      if(res){

      toast.success('Medicine added successfully');
      setFormData({
        name: '',
        type: '',
        price: '',
        quantity: '',
        mfgDate: '',
        expireDate: '',
      });
      }

    } catch (err) {
      toast.error('Failed to add medicine');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
     <div className='flex items-center justify-between'>
           <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Add New Medicine</h2>
           <h2 className="text-sm font-bold mb-6 text-center " onClick={()=>navigate('/medicines')}>Back</h2>
     </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            className="w-full p-3 border rounded"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Type (e.g., Tablet, Syrup)"
            className="w-full p-3 border rounded"
            value={formData.type}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full p-3 border rounded"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="w-full p-3 border rounded"
            value={formData.quantity}
            onChange={handleChange}
          />
          <input
            type="date"
            name="mfgDate"
            className="w-full p-3 border rounded"
            value={formData.mfgDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="expireDate"
            className="w-full p-3 border rounded"
            value={formData.expireDate}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-3 rounded hover:bg-orange-700 transition"
          >
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
