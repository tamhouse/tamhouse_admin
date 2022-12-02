import './App.css';
import './css/bootstrap.min.css'
import './css/fontawesome.min.css'
import './css/templatemo-style.css'
import './css/font.css'
import { config, routes } from "./const";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Footer, Login } from './pages';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const auth = cookies.get("auth")
  if(auth === undefined || auth !== config.auth)
    return (<Login/>)
  else return (
    <Router>
        <Header />
        <div className="container">
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        </div>
        <Footer />
      </Router>
  );
}

export default App;
