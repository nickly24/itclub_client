import React, { useEffect, useState } from 'react';

const MetroStationsSelector = ({ selectedStation, setSelectedStation }) => {
  const [stations, setStations] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchStations = async () => {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: `
          [out:json];
          area[name="Москва"]->.searchArea;
          node["railway"="station"](area.searchArea);
          out body;
        `,
      });
      const data = await response.json();
      const stations = data.elements.map(element => ({
        id: element.id,
        name: element.tags.name,
        line: element.tags['railway:ref'],
        color: element.tags['colour'],
      }));
      setStations(stations);
    };

    fetchStations();
  }, []);

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleStationSelect = (station) => {
    setSelectedStation({ name: station.name, color: station.color });
    setSearchText(station.name);
  };

  return (
    <div>
      <label>
        Станция метро:<br/>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px', padding: '8px', fontSize: '16px' }}
        />
      </label>
      {searchText && (
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
          {filteredStations.map(station => (
            <li
              key={station.id}
              onClick={() => handleStationSelect(station)}
              style={{ padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: station.color,
                  marginRight: '8px'
                }}
              ></span>
              {station.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MetroStationsSelector;
