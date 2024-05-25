import { Link } from 'react-router-dom';

export default function Header() {
  return(
    <>
      <div className='header_cont'>
        <div className='wrapper header_gaps'>
          <img className='header_logo' src="./img/logo.svg" width="100px"></img>
          <div className='menu_header'>
            <Link to="/"><p className='menu_names'> CRM</p></Link>
            <Link to="/dnevnik"><p className='menu_names ml15'> Дневник</p></Link>
            <Link to="/analytics"><p className='menu_names ml15'> Аналитика</p></Link>
          </div>
        </div>
      </div>
    </>
  )

}
