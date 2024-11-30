
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import Register from './Components/LoginForm/Register';
import Dashboard from './Components/LoginForm/Dashboard';
import Create from './Components/LoginForm/Create';
import Calculate from './Components/LoginForm/Calculate';
import Track from './Components/LoginForm/Track';


function App() {
  return (
    <div >
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/Dashboard' element={<Dashboard/>}></Route>
        <Route path='/Create' element={<Create/>}></Route>
        <Route path='/Calculate' element={<Calculate/>}></Route>
        <Route path='/Track' element={<Track/>}></Route>
       </Routes>     
      </BrowserRouter>
    
    </div>
  );
}

export default App;
