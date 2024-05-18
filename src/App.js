import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Header from './modules/Header'
import Sidebar from './modules/Sidebar'
import Filials  from './modules/Filials';
import ProbnFilials  from './modules/ProbnFilials';
import Table from './modules/Table';
import AddFilial from './modules/AddFilial';
import Addprobfilials from './modules/Addprobfilials';
function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <div className='wrapper gridx mt20'>
          <Sidebar/>
          <Routes>
              <Route exact path='/' Component={Filials}/>
              <Route exact path='/probn' Component={ProbnFilials}/>
              <Route exact path='/table' Component={Table}/>
              <Route exact path='/addfilial' Component={AddFilial}/>
              <Route exact path='/addprobfilial' Component={Addprobfilials}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
