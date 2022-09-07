import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { user, isError, isSucces, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [user, isError, isSucces, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className="container">
      <div className="content">
        <div className="row">
          <div className="form-whole">
            <div className="form-logo">
              <img
                className="logo-img"
                alt="logo"
                src="https://portal.ipservice.nl/media/brand/1.0_IP_service_logo_DEF_licht_oranje.jpg"
              />
              <br />
            </div>
            <div className="form-content">
              <div id="login-header">
                <h2>Login</h2>
              </div>
              <p>Voer je login gegevens in:</p>
              <form onSubmit={onSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label className="form-label">E-mail adres:</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          className="form-input"
                          id="email"
                          name="email"
                          value={email}
                          onChange={onChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label className="form-label">Wachtwoord:</label>
                      </th>
                      <td>
                        <input
                          type="password"
                          className="form-input"
                          id="password"
                          name="password"
                          value={password}
                          onChange={onChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="submit" className="btn btn-primary">
                  Volgende
                </button>
              </form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
