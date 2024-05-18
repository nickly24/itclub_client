import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Header from './modules/Header'
import Sidebar from './modules/Sidebar'
import Filials  from './modules/Filials';
import ProbnFilials  from './modules/ProbnFilials';
import Table from './modules/Table';
import AddFilial from './modules/AddFilial';
import Addprobfilials from './modules/Addprobfilials';
import PayInfo from './modules/PayModules/PayInfo';
function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <div className='wrapper gridx mt20'>
          <Sidebar/>
          <Routes>
              <Route exact path='/' Component={Filials}/>
              <Route  path='/probn' Component={ProbnFilials}/>
              <Route  path='/table' Component={Table}/>
              <Route  path='/addfilial' Component={AddFilial}/>
              <Route  path='/addprobfilial' Component={Addprobfilials}/>
              <Route  path='/payinfo' Component={PayInfo}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
