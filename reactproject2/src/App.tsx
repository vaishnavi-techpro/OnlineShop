import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddCategory from '../src/components/addCategory'
import ListCategory from '../src/components/listCategory'
import EditCategory from '../src/components/editCategory'
import ViewCategory from '../src/components/viewCategory'
import AddProduct from '../src/components/addProduct'
import ListProduct from '../src/components/listProduct';
//import ViewProduct from '../src/components/viewProduct';
//import EditProduct from '../src/components/editProduct'

function App() {
    const handleClose = () => {
        console.log('Closed!');
       
    };
    

    return (
        <Router>
            <div>
                <h1>Vite + React</h1>
                
                <Routes>
                    <Route path="/add-category" element={<AddCategory onClose={handleClose} />} />
                    <Route path="/list-category" element={<ListCategory />} />
                    <Route path="/edit-category/:id" element={<EditCategory />} /> 
                  <Route path="/view-category/:id" element={<ViewCategory />} /> 
                    <Route path="/add-product" element={<AddProduct onClose={handleClose} />} />
                    <Route path="/list-product" element={<ListProduct />} />  
                    {/*<Route path="/edit-product/:id" element={<EditProduct />} />*/} 
                    {/*<Route path="/view-product/:id" element={<ViewProduct />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
