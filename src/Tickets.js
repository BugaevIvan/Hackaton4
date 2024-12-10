import React, { useState, useEffect } from 'react';
import './Tickets.css';
import FlightTable from './FlightTable';
import FlightChart from './FlightChart';

// Компонент для таблицы рейсов
const EditableCell = ({ value, onChange, onBlur, type }) => {
  if (type === 'select') {
    return (
      <select value={value} onChange={onChange} onBlur={onBlur}>
        <option value="Активный">Активный</option>
        <option value="Не активный">Не активный</option>
      </select>
    );
  } else if (type === 'date') {
    return (
      <input type="date" value={value} onChange={onChange} onBlur={onBlur} />
    );
  } else if (type === 'time') {
    return (
      <input type="time" value={value} onChange={onChange} onBlur={onBlur} />
    );
  } else {
    return (
      <input type="text" value={value} onChange={onChange} onBlur={onBlur} />
    );
  }
};

const TravelTable = ({ flights, onFlightUpdate }) => {
  const [editingCells, setEditingCells] = useState({});
  const [filters, setFilters] = useState({
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
  });

  const handleCellClick = (flightId, fieldName) => {
    setEditingCells((prev) => ({
      ...prev,
      [`${flightId}-${fieldName}`]: true,
    }));
  };

  const handleInputChange = (flightId, fieldName, value) => {
    const updatedValue = fieldName === 'ticketCount' ? Number(value) : value;
    onFlightUpdate(flightId, { [fieldName]: updatedValue });
  };

  const handleBlur = (flightId, fieldName) => {
    setEditingCells((prev) => ({
      ...prev,
      [`${flightId}-${fieldName}`]: false,
    }));
  };

  const handleFilterChange = (fieldName, value) => {
    setFilters((prev) => ({ ...prev, [fieldName]: value }));
  };

  const filteredFlights = flights.filter(flight => {
    return (
      (filters.departureDate ? flight.departureDate.includes(filters.departureDate) : true) &&
      (filters.departureTime ? flight.departureTime.includes(filters.departureTime) : true) &&
      (filters.arrivalDate ? flight.arrivalDate.includes(filters.arrivalDate) : true) &&
      (filters.arrivalTime ? flight.arrivalTime.includes(filters.arrivalTime) : true)
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="tableHeaderElement">Тип транспорта</th>
          <th className="tableHeaderElement">Маршрут</th>
          <th className="tableHeaderElement">Дата вылета</th>
          <th className="tableHeaderElement">Время вылета</th>
          <th className="tableHeaderElement">Дата прибытия</th>
          <th className="tableHeaderElement">Время прибытия</th>
          <th className="tableHeaderElement">Статус доступности</th>
          <th className="tableHeaderElement">Количество билетов</th>
        </tr>
        <tr>
          <th className="tableHeaderElement"></th>
          <th className="tableHeaderElement"></th>
          <th className="tableHeaderElement">
            <input
              type="date"
              value={filters.departureDate}
              onChange={(e) => handleFilterChange('departureDate', e.target.value)}
            />
          </th>
          <th className="tableHeaderElement">
            <input
              type="time"
              value={filters.departureTime}
              onChange={(e) => handleFilterChange('departureTime', e.target.value)}
            />
          </th>
          <th className="tableHeaderElement">
            <input
              type="date"
              value={filters.arrivalDate}
              onChange={(e) => handleFilterChange('arrivalDate', e.target.value)}
            />
          </th>
          <th className="tableHeaderElement">
            <input
              type="time"
              value={filters.arrivalTime}
              onChange={(e) => handleFilterChange('arrivalTime', e.target.value)}
            />
          </th>
          <th className="tableHeaderElement"></th>
          <th className="tableHeaderElement"></th>
        </tr>
      </thead>
      <tbody>
        {filteredFlights.map((flight) => (
          <tr key={flight.id}>
            <td className="tableElement">{flight.transportType}</td>
            <td className="tableElement">{flight.route}</td>
            {['departureDate', 'departureTime', 'arrivalDate', 'arrivalTime'].map((field) => (
              <td className="tableElement" key={field}>
                {editingCells[`${flight.id}-${field}`] ? (
                  <EditableCell
                    value={flight[field]}
                    onChange={(e) =>
                      handleInputChange(flight.id, field, e.target.value)
                    }
                    onBlur={() => handleBlur(flight.id, field)}
                    type={field.includes('Date') ? 'date' : 'time'}
                  />
                ) : (
                  <span onClick={() => handleCellClick(flight.id, field)}>
                    {flight[field]}
                  </span>
                )}
              </td>
            ))}
            <td className="tableElement">
              {editingCells[`${flight.id}-ticketStatus`] ? (
                <EditableCell
                  value={flight.ticketStatus}
                  onChange={(e) =>
                    handleInputChange(flight.id, 'ticketStatus', e.target.value)
                  }
                  onBlur={() => handleBlur(flight.id, 'ticketStatus')}
                  type="select"
                />
              ) : (
                <span onClick={() => handleCellClick(flight.id, 'ticketStatus')}>
                  {flight.ticketStatus}
                </span>
              )}
            </td>
            <td className="tableElement">
              {editingCells[`${flight.id}-ticketCount`] ? (
                <EditableCell
                  value={flight.ticketCount}
                  onChange={(e) =>
                    handleInputChange(flight.id, 'ticketCount', e.target.value)
                  }
                  onBlur={() => handleBlur(flight.id, 'ticketCount')}
                />
              ) : (
                <span onClick={() => handleCellClick(flight.id, 'ticketCount')}>
                  {flight.ticketCount}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Компонент для добавления нового рейса
const AddFlightModal = ({ isOpen, onClose, onAddFlight }) => {
  const [newFlight, setNewFlight] = useState({
    transportType: '',
    route: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    ticketStatus: 'Активный',
    ticketCount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFlight((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onAddFlight(newFlight);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Добавить рейс</h2>
        <p>
          Тип транспорта:
          <input type="text" name="transportType" value={newFlight.transportType} onChange={handleChange} />
        </p>
        <p>
          Маршрут:
          <input type="text" name="route" value={newFlight.route} onChange={handleChange} />
        </p>
        <p>
          Дата вылета:
          <input type="date" name="departureDate" value={newFlight.departureDate} onChange={handleChange} />
        </p>
        <p>
          Время вылета:
          <input type="time" name="departureTime" value={newFlight.departureTime} onChange={handleChange} />
        </p>
        <p>
          Дата прибытия:
          <input type="date" name="arrivalDate" value={newFlight.arrivalDate} onChange={handleChange} />
        </p>
        <p>
          Время прибытия:
          <input type="time" name="arrivalTime" value={newFlight.arrivalTime} onChange={handleChange} />
        </p>
        <p>
          Статус доступности:
          <select name="ticketStatus" value={newFlight.ticketStatus} onChange={handleChange}>
            <option value="Активный">Активный</option>
            <option value="Не активный">Не активный</option>
          </select>
        </p>
        <p>
          Количество билетов:
          <input type="number" name="ticketCount" value={newFlight.ticketCount} onChange={handleChange} />
        </p>
        <button onClick={handleSubmit} class="buttonHeader">Добавить</button>
        <button onClick={onClose} class="buttonHeader">Закрыть</button>
      </div>
    </div>
  );
};

// Компонент для покупки билетов
const BuyTicketModal = ({ isOpen, onClose, flights, onBuyTicket }) => {
  const [selectedFlightId, setSelectedFlightId] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [availableTickets, setAvailableTickets] = useState(0);

  // Сброс состояния при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setSelectedFlightId('');
      setTicketCount(1);
      setAvailableTickets(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFlightChange = (e) => {
    const flightId = e.target.value;
    setSelectedFlightId(flightId);

    const selectedFlight = flights.find(flight => flight.id === Number(flightId));
    if (selectedFlight) {
      setAvailableTickets(selectedFlight.ticketCount);
    } else {
      setAvailableTickets(0);
    }
  };

  const handleConfirm = () => {
    if (ticketCount > availableTickets) {
      alert('Недостаточно доступных билетов');
      return;
    }
    onBuyTicket(selectedFlightId, ticketCount);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Купить билет</h2>
        <select onChange={handleFlightChange} value={selectedFlightId}>
          <option value="" disabled>Выберите рейс</option>
          {flights.map((flight) => (
            <option key={flight.id} value={flight.id}>
              {flight.route}
            </option>
          ))}
        </select>
        {selectedFlightId && (
          <div>
            <span>Доступно билетов: {availableTickets}</span>
          </div>
        )}
        <input
          type="number"
          min="1"
          max={availableTickets}
          value={ticketCount}
          onChange={(e) => setTicketCount(Number(e.target.value))}
          placeholder="Количество билетов"
        />
        <div>
          <button onClick={handleConfirm} class="buttonHeader">Подтвердить</button>
          <button onClick={onClose} class="buttonHeader">Закрыть</button>
        </div>
      </div>
    </div>
  );
};

//Компонент видов анализа
const AnalysisModal = ({ isOpen, onClose, flights }) => {
  const [viewMode, setViewMode] = useState('table');
  const [checkButton, setcheckButton] = useState('');

  if (!isOpen) return null;

  const handleClick = (mode) => {
    setcheckButton(mode);
  };

  return (
    <div className="modal">
      <div className="modal-contentAnalysis">
        <h2 class="Name">Аналитика по загрузке рейсов</h2>
        <div class="elementAnalysis">
          <button class="buttonHeader" onClick={() => handleClick('general')}>
            Анализ общей загрузки рейсов
          </button>
          <button class="buttonHeader" onClick={() => handleClick('routes')}>
            Анализ по маршрутам
          </button>
          <button class="buttonHeader" onClick={() => handleClick('seasons')}>
            Анализ по времени года
          </button>
        </div>
        <div class="textAnalysis">
          <button class="switch-btn" onClick={() => setViewMode(viewMode === 'table' ? 'graph' : 'table')}>
            {viewMode === 'table' ? 'Таблица' : 'График'}
          </button>
        </div>
        {viewMode === 'table' ? (
          <FlightTable flights={flights} checkButton={checkButton} />
        ) : (
          <FlightChart flights={flights} checkButton={checkButton} />
        )}
        <button onClick={onClose} class="buttonHeader">Закрыть</button>
      </div>
    </div>
  );
};

// Основной компонент для управления рейсами
const Tickets = () => {
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  const flightsData = [
    {
      id: 1,
      transportType: 'Самолет',
      route: 'Москва - Санкт-Петербург',
      departureDate: '2024-09-17',
      departureTime: '10:00',
      arrivalDate: '2024-09-18',
      arrivalTime: '12:00',
      ticketStatus: 'Активный',
      ticketCount: 100,
    },
    {
      id: 2,
      transportType: 'Поезд',
      route: 'Санкт-Петербург - Москва',
      departureDate: '2024-03-16',
      departureTime: '14:30',
      arrivalDate: '2024-03-17',
      arrivalTime: '08:00',
      ticketStatus: 'Не активный',
      ticketCount: 50,
    },
  ];

  const [flights, setFlights] = useState(flightsData);
  const [isAddFlightModalOpen, setIsAddFlightModalOpen] = useState(false);
  const [isBuyTicketModalOpen, setIsBuyTicketModalOpen] = useState(false);

  const handleFlightUpdate = (flightId, updatedData) => {
    const updatedFlights = flights.map((flight) =>
      flight.id === flightId ? { ...flight, ...updatedData } : flight
    );
    setFlights(updatedFlights);
  };

  const handleAddFlight = (newFlight) => {
    const flightWithId = { ...newFlight, id: flights.length + 1 };
    setFlights((prev) => [...prev, flightWithId]);
  };

  const handleBuyTicket = (flightId, ticketCount) => {
    const updatedFlights = flights.map((flight) => {
      if (flight.id === Number(flightId)) {
        return { ...flight, ticketCount: flight.ticketCount - ticketCount };
      }
      return flight;
    });
    setFlights(updatedFlights);
  };

  return (
    <div>
      <h1 className="Name">Билеты</h1>
      <div className="Name">
        <button className="buttonHeader" onClick={() => setIsAddFlightModalOpen(true)}>Добавить рейс</button>
        <button className="buttonHeader" onClick={() => setIsBuyTicketModalOpen(true)}>Купить билет</button>
        <button className="buttonHeader" onClick={() => setIsAnalysisModalOpen(true)}>Аналитика по загрузке рейсов</button>
      </div>
      <TravelTable flights={flights} onFlightUpdate={handleFlightUpdate} />
      <AddFlightModal isOpen={isAddFlightModalOpen} onClose={() => setIsAddFlightModalOpen(false)} onAddFlight={handleAddFlight} />
      <BuyTicketModal isOpen={isBuyTicketModalOpen} onClose={() => setIsBuyTicketModalOpen(false)} flights={flights} onBuyTicket={handleBuyTicket} />
      <AnalysisModal isOpen={isAnalysisModalOpen} onClose={() => setIsAnalysisModalOpen(false)} flights={flights} />
    </div>
  );
};

export default Tickets;
