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
    <div className="w-full max-w-full overflow-x-hidden space-y-4 md:space-y-6">
      {/* Top Info Boxes */}
      <div className='flex flex-col lg:flex-row items-start justify-between gap-4'>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full lg:w-auto">
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 md:p-4 rounded shadow w-full sm:w-auto">
            <p className="font-bold text-sm md:text-lg">Total Medicines</p>
            <p className="text-xl md:text-2xl">{medicines.length}</p>
          </div>

          <div
            onClick={() => setShowExpired(!showExpired)}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 md:p-4 rounded shadow cursor-pointer w-full sm:w-auto hover:bg-red-200"
          >
            <p className="font-bold text-sm md:text-lg">Expired Medicines</p>
            <p className="text-xl md:text-2xl">{expiredCount}</p>
          </div>
        </div>
        
        <Link
          to="/add-medicines"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 shadow w-full sm:w-auto text-center text-sm md:text-base"
        >
          Add New Medicine
        </Link>
      </div>
        

      {/* Search */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 md:p-3 border rounded shadow text-sm md:text-base"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="table-responsive">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Name</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Type</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Price</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Quantity</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Mfg Date</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Exp Date</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Status</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((med) => (
                  <tr
                    key={med._id}
                    className={`border-b text-xs md:text-sm ${isExpired(med.expireDate) ? 'text-red-600 font-semibold' : ''}`}
                  >
                    <td className="px-2 md:px-4 py-2">{med.name}</td>
                    <td className="px-2 md:px-4 py-2">{med.type}</td>
                    <td className="px-2 md:px-4 py-2">₹{med.price}</td>
                    <td className="px-2 md:px-4 py-2">{med.quantity}</td>
                    <td className="px-2 md:px-4 py-2">{formatDateTime(med?.mfgDate)}</td>
                    <td className="px-2 md:px-4 py-2">{formatDateTime(med?.expireDate)}</td>
                    <td className="px-2 md:px-4 py-2">{med.status ? 'Available' : 'Unavailable'}</td>
                    <td className="px-2 md:px-4 py-2">
                      <div className="flex flex-col sm:flex-row gap-1 md:gap-2">
                        <button
                          onClick={() => handleEditClick(med)}
                          className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded hover:bg-blue-600 text-xs md:text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(med._id)}
                          className="bg-red-500 text-white px-2 md:px-3 py-1 rounded hover:bg-red-600 text-xs md:text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-400 text-sm md:text-base">
                    No medicine data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4">Edit Medicine</h2>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData?.name || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={editData?.type || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editData?.price || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editData?.quantity || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm md:text-base"
                />
              </div>

              
        {/* Mfg Date */}
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">Mfg Date</label>
          <input
            type="date"
            name="mfgDate"
            value={editData?.mfgDate ? moment(editData.mfgDate).format("YYYY-MM-DD") : ""}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm md:text-base"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">Expiry Date</label>
          <input
            type="date"
            name="expireDate"
            value={editData?.expireDate ? moment(editData.expireDate).format("YYYY-MM-DD") : ""}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm md:text-base"
          />
        </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={editData?.status || false}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value === 'true' })}
                  className="w-full p-2 border rounded text-sm md:text-base"
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-6">
              <button
                onClick={() => handleSave(editData)}
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 text-sm md:text-base"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditData(null);
                }}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineTable;
