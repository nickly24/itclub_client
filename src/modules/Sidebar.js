import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const [activeButton, setActiveButton] = useState('Филиалы');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className='sidebar card_main'>
      <div className="otdel_name">отдел: <span className='orj'>NP1</span>
      </div>
      <div className="sb_buttons">
        <Link to="/">
          <div
            className={`sb_button ${activeButton === 'Филиалы' ? 'sb_active' : 'sb_noactive'}`}
            onClick={() => handleButtonClick('Филиалы')}
          >
            Филиалы
          </div>
        </Link>
        <Link to="/probn">
          <div
            className={`sb_button ${activeButton === 'Пробные' ? 'sb_active' : 'sb_noactive'}`}
            onClick={() => handleButtonClick('Пробные')}
          >
            Пробные
          </div>
        </Link>
        <Link to="/table">
          <div
            className={`sb_button ${activeButton === 'Расписание' ? 'sb_active' : 'sb_noactive'}`}
            onClick={() => handleButtonClick('Расписание')}
          >
            Расписание
          </div>
        </Link>
        <Link to="/addfilial">
          <div
            className={`sb_button ${activeButton === 'Добавить филлиал' ? 'sb_active' : 'sb_noactive'}`}
            onClick={() => handleButtonClick('Добавить филлиал')}
          >
            Добавить филлиал
          </div>
        </Link>
        <Link to="/addprobfilial">
          <div
            className={`sb_button ${activeButton === 'Добавить пробное' ? 'sb_active' : 'sb_noactive'}`}
            onClick={() => handleButtonClick('Добавить пробное')}
          >
            Добавить пробное
          </div>
        </Link>
      </div>
    </div>
  );
}
