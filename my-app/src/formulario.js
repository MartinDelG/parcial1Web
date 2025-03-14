import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function Formulario() {
  const [formValues, setFormValues] = useState({ login: "", password: "" });
  const [validationStates, setValidationStates] = useState({
    loginState: true,
    passwordState: true,
  });
  const [emailValidated, setEmailValidated] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setFormValues({ ...formValues, login: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (response.status === 200) {
        navigate("/robots");
      } else {
        setLoginError(true);
      }
    } catch (error) {

    }
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center mb-3">Inicio de sesión</h3>

      <Form onSubmit={handleSubmit} style={{ width: "350px" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            value={formValues.login}
            onChange={handleLoginChange}
            isInvalid={emailValidated && !validationStates.loginState}
            style={{ borderColor: "#d9d9d9", backgroundColor: "#d9d9d9" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fw-bold">Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={formValues.password}
            onChange={handlePasswordChange}
            isInvalid={!validationStates.passwordState}
            style={{ borderColor: "#d9d9d9", backgroundColor: "#d9d9d9" }}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button type="submit" style={{ backgroundColor: "#0056b3", borderColor: "#0056b3", width: "48%" }}>
            Ingresar
          </Button>
          <Button variant="danger" style={{ backgroundColor: "#d9534f", borderColor: "#d9534f", width: "48%" }}>
            Cancelar
          </Button>
        </div>
      </Form>

      {loginError && (
        <Alert variant="danger" className="text-center p-2 mt-3" style={{ width: "350px" }}>
          <small>Error de autenticación. Revise sus credenciales</small>
        </Alert>
      )}
    </div>
  );
}

export default Formulario;
