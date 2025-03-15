import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './robots.css';

function Robots() {
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/robots")
      .then((response) => response.json())
      .then((data) => setRobots(data));
  }, []);

  const handleRowClick = (id) => {
    fetch(`http://localhost:3001/robots/${id}`)
      .then((response) => response.json())
      .then((data) => setSelectedRobot(data));
  };

  return (
    <div className="container d-flex">

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Empresa Fabricante</th>
          </tr>
        </thead>
        <tbody>
          {robots.map((robot) => (
            <tr 
              key={robot.id} 
              onClick={() => handleRowClick(robot.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{robot.id}</td>
              <td>{robot.nombre}</td>
              <td>{robot.modelo}</td>
              <td>{robot.empresaFabricante}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRobot && (
        <div className="tarjeta">
        <div className="card mt-4 p-3">
          <h3 className="text-center">{selectedRobot.nombre}</h3>
          <div className="text-center">
          <img 
                src={require(`./robot${selectedRobot.id}.png`)} 
                style={{ maxWidth: "200px", border: "2px solid black" }} 
              />
          </div>
          <ul>
            <li><strong>Año de Fabricación:</strong> {selectedRobot.añoFabricacion}</li>
            <li><strong>Capacidad de Procesamiento:</strong> {selectedRobot.capacidadProcesamiento} GHz</li>
            <li><strong>Humor:</strong> {selectedRobot.humor}</li>
          </ul>
        </div>
        </div>
      )}
    </div>
  );
}

export default Robots;
