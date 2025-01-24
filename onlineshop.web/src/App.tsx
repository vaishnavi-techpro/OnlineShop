import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ListProduct from './components/listProduct';
import AddProduct from './components/addProduct';
import EditProduct from './components/editProduct';
import ViewProduct from './components/viewProduct';
import ListCategory from './components/listCategory';
import AddCategory from './components/addCategory';
import ViewCategory from './components/viewCategory';
import EditCategory from './components/editCategory';
import ListProductCategory from './components/listProductCategory';
import UserLogin from './components/userLogin';
import Dashboard from './components/dashboard';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);
    
    return (
        <div>
            <h1>Welcome to the Online Store</h1>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<UserLogin setIsLoggedIn={setIsLoggedIn} />} />
                    <Route
                        path="/dashboard"
                        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/list-product"
                        element={isLoggedIn ? <ListProduct /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/add-product"
                        element={isLoggedIn ? <AddProduct onClose={() => { }} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/edit-product/:id"
                        element={isLoggedIn ? <EditProduct /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/view-product/:id"
                        element={isLoggedIn ? <ViewProduct /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/delete-product/:id"
                    //element={isLoggedIn ? <DeleteProduct/> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/add-category"
                        element=<AddCategory onClose={() => { }} /> />
                    <Route
                        path="/list-category"
                        element={isLoggedIn ? <ListCategory isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/view-category/:id"
                        element={isLoggedIn ? <ViewCategory /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/edit-category/:id"
                        element={isLoggedIn ? <EditCategory /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/list-productcategory"
                        element={isLoggedIn ? <ListProductCategory /> : <Navigate to="/login" />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
