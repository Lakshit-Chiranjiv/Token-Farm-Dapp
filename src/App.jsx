import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import AddressBar from './components/AddressBar';
import Balance from './components/Balance';

function App() {
  return (
    <div className="container App">
      <Header/>
      <AddressBar/>
      <Balance/>
    </div>
  );
}

export default App;
