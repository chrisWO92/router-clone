import './App.css';
import {Router, Routes, Route} from './Hooks/RouterClone'
import Products from './Products';
import Product from './Product';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products/:id">
          <Product />
        </Route>
        <Route path="/">
          <Products />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
