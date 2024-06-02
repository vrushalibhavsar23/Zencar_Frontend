// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// function Dashboard() {
//   const [inventory, setInventory] = useState([]);
//   const [sales, setSales] = useState([]);
//   const [year, setYear] = useState('');
//   const [inventoryFile, setInventoryFile] = useState(null);
//   const [salesFile, setSalesFile] = useState(null);

//   useEffect(() => {
//     fetchInventory();
//     fetchSales();
//   }, []);

//   const fetchInventory = () => {
//     const token = localStorage.getItem('token');
//     axios.get('http://127.0.0.1:8000/api/car/inventory', {
//       headers: {
//         Authorization: `Token ${token}`
//       }
//     })
//     .then(response => setInventory(response.data))
//     .catch(error => console.error('Error fetching inventory:', error));
//   };

//   const fetchSales = () => {
//     const token = localStorage.getItem('token');
//     axios.get('http://127.0.0.1:8000/api/car/sales', {
//       headers: {
//         Authorization: `Token ${token}`
//       }
//     })
//     .then(response => setSales(response.data))
//     .catch(error => console.error('Error fetching sales:', error));
//   };

//   const handleUploadInventory = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
//     formData.append('file', inventoryFile);

//     axios.post('http://127.0.0.1:8000/api/car/upload-inventory/', formData, {
//       headers: {
//         Authorization: `Token ${token}`,
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//     .then(() => {
//       alert('Inventory file uploaded successfully');
//       fetchInventory();
//     })
//     .catch(error => console.error('Error uploading inventory file:', error));
//   };

//   const handleUploadSales = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
//     formData.append('file', salesFile);

//     axios.post('http://127.0.0.1:8000/api/car/upload-sales/', formData, {
//       headers: {
//         Authorization: `Token ${token}`,
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//     .then(() => {
//       alert('Sales file uploaded successfully');
//       fetchSales();
//     })
//     .catch(error => console.error('Error uploading sales file:', error));
//   };

//   const filteredInventory = year ? inventory.filter(item => item.model_year === parseInt(year)) : inventory;
//   const filteredSales = year ? sales.filter(item => item.model_year === parseInt(year)) : sales;

//   return (
//     <div className="dashboard">
//       <h2>Dashboard</h2>
//       <div className="filter-section">
//         <label>Filter by Year:</label>
//         <select onChange={e => setYear(e.target.value)} value={year}>
//           <option value="">All</option>
//           {[...Array(10)].map((_, i) => {
//             const yearOption = new Date().getFullYear() - i;
//             return <option key={yearOption} value={yearOption}>{yearOption}</option>;
//           })}
//         </select>
//       </div>
//       <div className="data-section">
//         <div className="inventory-section">
//           <h3>Car Inventory</h3>
//           <ul>
//             {filteredInventory.map(item => (
//               <li key={item.id}>{item.car_name} - {item.model_year} - {item.quantity}</li>
//             ))}
//           </ul>
//           <form onSubmit={handleUploadInventory}>
//             <label>Upload Inventory Excel:</label>
//             <input type="file" onChange={e => setInventoryFile(e.target.files[0])} />
//             <button type="submit">Upload</button>
//           </form>
//         </div>
//         <div className="sales-section">
//           <h3>Car Sales</h3>
//           <ul>
//             {filteredSales.map(item => (
//               <li key={item.id}>{item.car_name} - {item.model_year} - {item.sales_count}</li>
//             ))}
//           </ul>
//           <form onSubmit={handleUploadSales}>
//             <label>Upload Sales Excel:</label>
//             <input type="file" onChange={e => setSalesFile(e.target.files[0])} />
//             <button type="submit">Upload</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [sales, setSales] = useState([]);
  const [year, setYear] = useState('');
  const [inventoryFile, setInventoryFile] = useState(null);
  const [salesFile, setSalesFile] = useState(null);
  const [inventoryYears, setInventoryYears] = useState([]);
  const [salesYears, setSalesYears] = useState([]);

  useEffect(() => {
    fetchInventory();
    fetchSales();
    fetchInventoryYears();
    fetchSalesYears();
  }, []);

  const fetchInventory = () => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/api/car/inventory', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => setInventory(response.data))
    .catch(error => console.error('Error fetching inventory:', error));
  };

  const fetchSales = () => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/api/car/sales', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => setSales(response.data))
    .catch(error => console.error('Error fetching sales:', error));
  };

  const fetchInventoryYears = () => {
    axios.get('http://127.0.0.1:8000/api/car/inventory-years')
    .then(response => setInventoryYears(response.data))
    .catch(error => console.error('Error fetching inventory years:', error));
  };

  const fetchSalesYears = () => {
    axios.get('http://127.0.0.1:8000/api/car/sales-years')
    .then(response => setSalesYears(response.data))
    .catch(error => console.error('Error fetching sales years:', error));
  };

  const handleUploadInventory = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', inventoryFile);

    axios.post('http://127.0.0.1:8000/api/car/upload-inventory/', formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      alert('Inventory file uploaded successfully');
      fetchInventory();
    })
    .catch(error => console.error('Error uploading inventory file:', error));
  };

  const handleUploadSales = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', salesFile);

    axios.post('http://127.0.0.1:8000/api/car/upload-sales/', formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      alert('Sales file uploaded successfully');
      fetchSales();
    })
    .catch(error => console.error('Error uploading sales file:', error));
  };

  const filteredInventory = year ? inventory.filter(item => item.model_year === parseInt(year)) : inventory;
  const filteredSales = year ? sales.filter(item => item.model_year === parseInt(year)) : sales;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="filter-section">
        <label>Filter by Year:</label>
        <select onChange={e => setYear(e.target.value)} value={year}>
          <option value="">All</option>
          {inventoryYears.concat(salesYears).filter((value, index, self) => self.indexOf(value) === index).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="data-section">
        <div className="inventory-section">
          <h3>Car Inventory</h3>
          <ul>
            {filteredInventory.map(item => (
              <li key={item.id}>{item.car_name} - {item.model_year} - {item.quantity}</li>
            ))}
          </ul>
          <form onSubmit={handleUploadInventory}>
            <label>Upload Inventory Excel:</label>
            <input type="file" onChange={e => setInventoryFile(e.target.files[0])} />
            <button type="submit">Upload</button>
          </form>
        </div>
        <div className="sales-section">
          <h3>Car Sales</h3>
          <ul>
            {filteredSales.map(item => (
              <li key={item.id}>{item.car_name} - {item.model_year} - {item.sales_count}</li>
            ))}
          </ul>
          <form onSubmit={handleUploadSales}>
            <label>Upload Sales Excel:</label>
            <input type="file" onChange={e => setSalesFile(e.target.files[0])} />
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
