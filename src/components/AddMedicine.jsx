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
    <div className="w-full max-w-full overflow-x-hidden flex items-center justify-center bg-gray-100 p-2 md:p-4 min-h-screen">
      <div className="w-full max-w-md md:max-w-xl bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
        <div className='flex items-center justify-between mb-4 md:mb-6'>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-orange-600">Add New Medicine</h2>
          <button 
            className="text-sm md:text-base font-bold text-blue-600 hover:text-blue-800 transition-colors"
            onClick={() => navigate('/medicines')}
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-sm md:text-base font-medium mb-1 text-gray-700">Medicine Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter medicine name"
              className="w-full p-2 md:p-3 border rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm md:text-base font-medium mb-1 text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              placeholder="e.g., Tablet, Syrup, Injection"
              className="w-full p-2 md:p-3 border rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm md:text-base font-medium mb-1 text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="w-full p-2 md:p-3 border rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm md:text-base font-medium mb-1 text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              className="w-full p-2 md:p-3 border rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm md:text-base font-medium mb-1 text-gray-700">Manufacturing Date</label>
            <input
              type="date"
              name="mfgDate"
              className="w-full p-2 md:p-3 border rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.mfgDate}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm md:text-base font-medium mb-1 text-gray-700">Expiry Date</label>
            <input
              type="date"
              name="expireDate"
              className="w-full p-2 md:p-3 border rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.expireDate}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-2 md:p-3 rounded hover:bg-orange-700 transition-colors text-sm md:text-base font-medium"
          >
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
