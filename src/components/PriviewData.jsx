import headerImg from '../assets/images/header.jpg'
import mainImg from '../assets/images/main.jpg'
import footerImg from '../assets/images/footer.jpg'



const PriviewData = ({ userInformation, addmedicines, open, close }) => {
  const now = new Date();
  const formatted = `${now.getDate().toString().padStart(2, '0')}/${
    (now.getMonth() + 1).toString().padStart(2, '0')
  }/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  const formattedDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
      style={{ paddingBottom: "60px" }}
    >
      <div className="a4-container">
        {/* Header */}
        <div className="header-section">
          <img src={headerImg} alt="Header" className="header-image" />
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-grid">
            <div className="info-item">
              <label>Name:</label>
              {userInformation?.patientName || '--'}
            </div>
            <div className="info-item">
              <label>S.No:</label>
              {userInformation?.patientCode}
            </div>
            <div className="info-item">
              <label>Date of Birth:</label>
              {formattedDate(userInformation?.dateOfBirth)}
            </div>
            <div className="info-item">
              <label>Date:</label>
              {formatted}
            </div>
          </div>
        </div>

        {/* Main Section with background */}
        <div
          className="main-section"
          style={{
            backgroundImage: `url(${mainImg})`,
          }}
        >
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">💊 Medicines</h3>
            <table className="w-full text-left border border-gray-200">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Dose</th>
                  <th className="p-2 border">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {addmedicines.map((med, idx) => (
                  <tr key={idx} className="text-sm">
                    <td className="p-2 border">{idx + 1}</td>
                    <td className="p-2 border">{med.name}</td>
                    <td className="p-2 border">{med.dose || '--'}</td>
                    <td className="p-2 border">
                      {Object.entries(med.frequency || {})
                        .map(([time, meals]) => {
                          const labels = [];
                          if (meals.beforeMeal) labels.push(`${time} (Before)`);
                          if (meals.afterMeal) labels.push(`${time} (After)`);
                          return labels.join(', ');
                        })
                        .join(', ') || '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <img src={footerImg} alt="Footer" className="footer-image" />
        </div>
      </div>
    </div>
  );
};


export default PriviewData