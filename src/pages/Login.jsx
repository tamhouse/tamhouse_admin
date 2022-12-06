import { useState } from 'react';
import Cookies from 'universal-cookie';
import { config } from '../const';
const Login = () => {
  const [state, setState] = useState({});
  const [error, setError] = useState(false);
  const SignIn = (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    if(config.name === state.username && config.pass === state.password){
      console.log(config)
      cookies.set("auth", config.auth)
      window.location.href = "/"
    }
    else{
      setError(true)
    }
  }
  if(error)
    setInterval( () => {
      setError(false)
    }, 2000)
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({...state, [name]: value}
    );
  }
  return (
    <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-12 mx-auto tm-login-col">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="tm-block-title mb-4">Welcome to Dashboard, Login</h2>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <form onSubmit={SignIn} className="tm-login-form">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      onChange={handleInputChange}
                      name="username"
                      type="text"
                      value={state.username}
                      className="form-control validate"
                      id="username"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={handleInputChange}
                      name="password"
                      type="password"
                      className="form-control validate"
                      id="password"
                      value={state.password}
                      required
                    />
                  </div>
                  {error && (
                    <label style={{color: "red", fontSize: 18}} htmlFor="">Sai tài khoản hoặc mật khẩu</label>
                  )}
                  <div className="form-group mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block text-uppercase"
                    >
                      Login
                    </button>
                  </div>
                  <button className="mt-5 btn btn-primary btn-block text-uppercase">
                    Forgot your password?
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login

