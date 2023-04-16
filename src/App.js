import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './views/Home';
import Shop from './views/Shop';
import Cart from './views/Cart';
import Sproduct from './views/Sproduct';
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* any 'page' of our app can be defined as a route here */}

        <Route children path='/' element={<Home />} />
        <Route childern path='/shop' element={<Shop />}  />
        <Route childern path='/cart' element={<Cart />}  />
        <Route childern path='/Sproduct/:productId' element={<Sproduct />}  />
        
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
