import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './modules/Header';
import Sidebar from './modules/Sidebar';
import Filials from './modules/Filials';
import ProbnFilials from './modules/ProbnFilials';
import Table from './modules/Table';
import AddFilial from './modules/AddFilial';
import Addprobfilials from './modules/Addprobfilials';
import PayInfo from './modules/PayModules/PayInfo';
import AppDnevnik from './dnevnik/AppDnevnik';
import  Analytics  from './analytics/Analytics';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/*" element={<CrmConsole />} />
          <Route path="/dnevnik" element={<AppDnevnik />} />
          <Route path="/analytics" element={<Analytics />}/>
        </Routes>
      </Router>
    </div>
  );
}

function CrmConsole() {
  return (
    <div className='wrapper gridx mt20'>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Filials />} />
        <Route path="/probn" element={<ProbnFilials />} />
        <Route path="/table" element={<Table />} />
        <Route path="/addfilial" element={<AddFilial />} />
        <Route path="/addprobfilial" element={<Addprobfilials />} />
        <Route path="/payinfo" element={<PayInfo />} />
      </Routes>
    </div>
  );
}

export default App;
