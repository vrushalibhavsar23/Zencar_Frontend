import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState('');

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<RegistrationForm />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import RegistrationForm from './components/RegistrationForm';
// import Dashboard from './components/Dashboard';
// import './App.css';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
//   const [username, setUsername] = useState('');

//   const handleLogin = (username) => {
//     setUsername(username);
//     setIsLoggedIn(true);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/dashboard" replace />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/dashboard" replace />
//               ) : (
//                 <LoginForm onLogin={handleLogin} />
//               )
//             }
//           />
//           <Route path="/register" element={<RegistrationForm />} />
//           <Route
//             path="/dashboard"
//             element={
//               isLoggedIn ? (
//                 <Dashboard />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

