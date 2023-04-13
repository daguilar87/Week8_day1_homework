import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Products from './views/Products';
import Home from './views/Home';
import Checkout from './views/Checkout';
function App() {
  return (
    <div className="App">
         <Nav />
        <Routes>
          {/* any 'page' of our app can be defined as a route here */}

          <Route children path='/' element={<Home/>} />
          <Route children path='/Products' element={<Products/>} />
          <Route children path='/Checkout' element={<Checkout/>} />




        </Routes>
        <Footer/>

    </div>
  );
}

export default App;
