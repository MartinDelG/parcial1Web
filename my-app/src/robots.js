import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
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
            <th><FormattedMessage id="ID" defaultMessage="ID" /></th>
            <th><FormattedMessage id="Name" defaultMessage="Name" /></th>
            <th><FormattedMessage id="Model" defaultMessage="Model" /></th>
            <th><FormattedMessage id="Manufacturing Company" defaultMessage="Manufacturing Company" /></th>
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
          <div className="card mt-4 p-3" style={{ backgroundColor: "#ececec" }}>
            <h3 className="text-center">{selectedRobot.nombre}</h3>
            <div className="text-center">
              <img 
                src={require(`./robot${selectedRobot.id}.png`)} 
                alt={selectedRobot.nombre}
                style={{ maxWidth: "200px", border: "2px solid black" }} 
              />
            </div>
            <ul>
              <li><strong><FormattedMessage id="Manufacturing Year" defaultMessage="Manufacturing Year" />:</strong> {selectedRobot.añoFabricacion}</li>
              <li><strong><FormattedMessage id="Processing Capacity" defaultMessage="Processing Capacity" />:</strong> {selectedRobot.capacidadProcesamiento} GHz</li>
              <li><strong><FormattedMessage id="Mood" defaultMessage="Mood" />:</strong> {selectedRobot.humor}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Robots;
