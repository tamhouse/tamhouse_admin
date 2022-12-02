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
    <div class="container tm-mt-big tm-mb-big">
      <div class="row">
        <div class="col-12 mx-auto tm-login-col">
          <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div class="row">
              <div class="col-12 text-center">
                <h2 class="tm-block-title mb-4">Welcome to Dashboard, Login</h2>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <form onSubmit={SignIn} class="tm-login-form">
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      onChange={handleInputChange}
                      name="username"
                      type="text"
                      value={state.username}
                      class="form-control validate"
                      id="username"
                      required
                    />
                  </div>
                  <div class="form-group mt-3">
                    <label for="password">Password</label>
                    <input
                      onChange={handleInputChange}
                      name="password"
                      type="password"
                      class="form-control validate"
                      id="password"
                      value={state.password}
                      required
                    />
                  </div>
                  {error && (
                    <label style={{color: "red", fontSize: 18}} htmlFor="">Sai tài khoản hoặc mật khẩu</label>
                  )}
                  <div class="form-group mt-4">
                    <button
                      type="submit"
                      class="btn btn-primary btn-block text-uppercase"
                    >
                      Login
                    </button>
                  </div>
                  <button class="mt-5 btn btn-primary btn-block text-uppercase">
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

