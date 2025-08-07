import React, { useEffect, useState } from 'react';
import { DeleteMedicine, GetAllMedicine, UpdateMedicine } from '../api/MedicineApi';
import { toast } from 'react-toastify';
import { formatDateTime } from '../api/CustomApi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { store } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/LoadingSlice';

const MedicineTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [medicines, setAllMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [showExpired, setShowExpired] = useState(false);
const dispatch = useDispatch()
  // Get All Medicines
  const fetchData = async () => {
      store.dispatch(setLoading(true));
    try {
      const data = await GetAllMedicine();
      setAllMedicines(data || []);
    } catch (err) {
      toast.error("Failed to fetch medicines");
    } finally {
        store.dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // isExpired logic
  const isExpired = (date) => moment(date).isBefore(moment(), 'day');

  // Filtering Logic
  useEffect(() => {
    let result = [...medicines];

    if (showExpired) {
      result = result.filter((med) => isExpired(med.expireDate));
    }

    if (search.trim() !== "") {
      result = result.filter((med) =>
        med.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredMedicines(result);
  }, [search, showExpired, medicines]);

  // Update Handler
  const handleSave = async (data) => {
    try {
      if (!data?._id) return toast.error("Invalid medicine data");

      if (!window.confirm("Are you sure you want to update this medicine?")) return;

      const updatedData = await UpdateMedicine(data._id, data);

      if (updatedData) {
        toast.success("Medicine updated successfully");
        setShowModal(false);
        setEditData(null);
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to update medicine");
    }
  };

  // Delete Handler
  const handleDelete = async (id) => {
    try {
      if (!id) return toast.error("ID not found");

      if (!window.confirm("Are you sure you want to delete this medicine?")) return;

      await DeleteMedicine(id);
      toast.success("Medicine deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete medicine");
    }
  };

  const handleEditClick = (medicine) => {
    setEditData(medicine);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const expiredCount = medicines.filter((m) => isExpired(m.expireDate)).length;

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        {/* Top Info Boxes */}
       <div className='flex items-start justify-between'>
         <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded shadow w-full sm:w-auto">
            <p className="font-bold text-lg">Total Medicines</p>
            <p className="text-2xl">{medicines.length}</p>
          </div>

          <div
            onClick={() => setShowExpired(!showExpired)}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow cursor-pointer w-full sm:w-auto hover:bg-red-200"
          >
            <p className="font-bold text-lg">Expired Medicines</p>
            <p className="text-2xl">{expiredCount}</p>
          </div>

         
        </div>
         <Link
            to="/add-medicines"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 shadow w-full sm:w-auto text-center"
          >
            Add New Medicine
          </Link>
       </div>
        

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-2 border rounded shadow"
          />
        </div>

        {/* Table */}
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Mfg Date</th>
              <th className="px-4 py-2">Exp Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((med) => (
                <tr
                  key={med._id}
                  className={`border-b text-sm ${isExpired(med.expireDate) ? 'text-red-600 font-semibold' : ''}`}
                >
                  <td className="px-4 py-2">{med.name}</td>
                  <td className="px-4 py-2">{med.type}</td>
                  <td className="px-4 py-2">₹{med.price}</td>
                  <td className="px-4 py-2">{med.quantity}</td>
                  <td className="px-4 py-2">{formatDateTime(med?.mfgDate)}</td>
                  <td className="px-4 py-2">{formatDateTime(med?.expireDate)}</td>
                  <td className="px-4 py-2">{med.status ? 'Available' : 'Unavailable'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEditClick(med)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(med._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400">
                  No medicine data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Medicine</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="type"
                value={editData.type}
                onChange={handleChange}
                placeholder="Type"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="quantity"
                value={editData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                name="mfgDate"
                value={editData?.mfgDate?.slice(0, 10) || ''}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                name="expireDate"
                value={editData?.expireDate?.slice(0, 10) || ''}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(editData)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineTable;
