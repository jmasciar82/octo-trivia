import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UsersAcreditaciones.css';
import printJS from 'print-js';
import LogoutButton from '../COMUN/LogoutButton';
import * as XLSX from 'xlsx'; // Importa la biblioteca xlsx
import { saveAs } from 'file-saver'; // Importa file-saver para descargar el archivo

const UsersAcreditaciones = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [empresaOtro, setEmpresaOtro] = useState(''); // Nuevo estado para la empresa personalizada
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const fetchUsers = async () => {
      const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
      try {
        const response = await axios.get(`${backendURL}/usersAcreditaciones`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    // Fetch users initially
    fetchUsers();

    // Set up interval to fetch users every 5 seconds
    const intervalId = setInterval(fetchUsers, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  //Función para exportar los usuarios a Excel
  const exportToExcel = () => {
    // Crea una hoja de trabajo (worksheet)
    const worksheet = XLSX.utils.json_to_sheet(users);
    // Crea un libro de trabajo (workbook)
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    // Genera el archivo Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // Crea un Blob y descarga el archivo
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'UsuariosAcreditaciones.xlsx');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

    setLoading(true);
    setErrorMessage(''); // Clear previous error message

    try {
      // Verifica si el email ya está registrado
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        setErrorMessage('El correo electrónico ya está registrado.');
        setLoading(false);
        return;
      }

      // Si selecciona "Otro", usar el valor personalizado
      const tipoEmpresa = tipo === 'Otro' ? empresaOtro : tipo;

      // Registra el nuevo usuario
      const response = await axios.post(`${backendURL}/usersAcreditaciones`, { name, email, tipo: tipoEmpresa });
      const newUser = response.data;

      // Verifica que newUser tenga un campo 'code'
      if (newUser && newUser.code) {
        setUser(newUser);
        setUsers((prevUsers) => [...prevUsers, newUser]);


      } else {
        console.error('Usuario registrado no contiene código.');
        setErrorMessage('Error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setErrorMessage('Error al registrar el usuario.');
    } finally {
      setLoading(false);
    }
  };


  const handlePrint = async (user) => {

    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';


    // Actualiza el campo codeUsed
    await axios.put(`${backendURL}/usersAcreditaciones/codeUsed/${user.code}`, {
      codeUsed: true
    });

    const credentialHTML = `
      <div class="credential-card">
        <h2>BAGO 2024<hr></hr></h2>
        <p class="item-name"><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Código:</strong> ${user.code}</p>
        <p><strong>Empresa:</strong> ${user.tipo}</p>
        <img src="${user.qrCode}" alt="Código QR" class="img-fluid qr-code" />
      </div>
    `;

    try {
      printJS({
        printable: credentialHTML,
        type: 'raw-html',
        style: `
          .credential-card {
            border: 1px solid black;
            padding: 20px;
            width: 200px;
            text-align: center;
            background-color: #fff;
            border-radius: 10px;
            margin: 0 auto;
          }
          .credential-logo {
            width: 100px;
            height: auto;
            margin-bottom: 1rem;
          }
          .credential-title {
            margin-bottom: 1.5rem;
          }
          .credential-card p {
            color: #343a40;
            margin-bottom: 0.5rem;
          }
          .qr-code {
            max-width: 50%;
            height: auto;
            margin-top: 1rem;
          }
        `,
        onPrintDialogClose: async () => {
          try {
            const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
            await axios.put(`${backendURL}/usersAcreditaciones/codeUsed/${user.code}`, {
              codeUsed: true
            });
            console.log(`Código ${user.code} marcado como usado correctamente.`);
          } catch (error) {
            console.error('Error al actualizar el estado de codeUsed:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error en la impresión:', error);
    }
  };


  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tipoOptions = [
    'Química Montpellier',
    'Nutricia',
    'Bioprofarma-Bagó',
    'Synthon Bagó',
    'Sinergium Biotech',
    'Biogénesis-Bagó',
    'Intercom',
    'Novofarma',
    'Disprofarma',
    'Otro'
  ];

  return (
    <div>
      <div className="login-container-wrapper">
        <div id="login-container-users">
          {token && (
            <div className="boton-out">
              <LogoutButton onLogout={handleLogout} />
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">

          </div>
          <h1>Registro de Usuario</h1>



          {loading ? (
            <div className="loading">Generando usuario, por favor espere...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <select
                className="form-control mb-3"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value="" disabled>Seleccionar Empresa</option>
                {tipoOptions.map((tipo, index) => (
                  <option key={index} value={tipo}>{tipo}</option>
                ))}
              </select>

              {/* Mostrar el campo de empresa personalizada si se selecciona "Otro" */}
              {tipo === 'Otro' && (
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Nombre de la Empresa"
                  value={empresaOtro}
                  onChange={(e) => setEmpresaOtro(e.target.value)}
                  required
                />
              )}

              <button id='btn-register-user' type="submit" className="btn btn-primary btn-block">Registrar</button>
            </form>
          )}

          {user && (
            <div className="user-credential mt-4">
              <h2>Credencial de Usuario</h2>
              <div className="credential-card">
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Código:</strong> {user.code}</p>
                <p><strong>Empresa:</strong> {user.tipo}</p>
                <img src={user.qrCode} alt="Código QR" className="img-fluid qr-code" />
              </div>
              <button onClick={() => handlePrint(user)} className="btn btn-success mt-3">Imprimir Credencial</button>
            </div>
          )}

          <hr></hr>

          <h2  id='usuarios-h2' className="mt-5">Usuarios Registrados: <span id='registrados'>{users.length}</span></h2>

          <button className="btn btn-primary mb-3" onClick={exportToExcel}>
            Exportar a Excel
          </button>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar por nombre o email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="user-list-container">
            <ul className="list-group-admin">
              {filteredUsers.map((u) => (
                <li key={u._id} className="list-group-item-admin">
                  <p className='item-name'><strong>Nombre:</strong> {u.name}</p>
                  <p><strong>Email:</strong> {u.email}</p>
                  <p><strong>Código:</strong> {u.code}</p>
                  <p><strong>Empresa:</strong> {u.tipo}</p>
                  <p><strong>Asistencia:</strong> {u.codeUsed ? 'Si' : 'No'}</p>
                  {/* Estado de escaneo */}
                  <img src={u.qrCode} alt="Código QR" className="img-fluid qr-code-admin" />
                  <button onClick={() => handlePrint(u)} className="btn-success mt-3">Imprimir</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersAcreditaciones;
