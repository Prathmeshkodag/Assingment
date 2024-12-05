import logo from './logo.svg';
import './App.css';
import UserTable from './Components/UserTable/UserTable';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import {BrowserRouter as Router} from 'react-router-dom';
import UserRouter from './Router/Router';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <UserRouter/>
        </Router>
      
      </Provider>
    </div>
  );
}

export default App;
