import React from 'react';

const FlightTable = ({ flights, checkButton }) => {
    const dailyTicketCounts = {};
    const seasonalTicketCounts = {};

    flights.forEach((flight) => {
        const date = flight.departureDate;
        dailyTicketCounts[date] = (dailyTicketCounts[date] || 0) + flight.ticketCount;
    });

    const getSeason = (month) => {
        if (month >= 3 && month <= 5) return 'Весна';
        if (month >= 6 && month <= 8) return 'Лето';
        if (month >= 9 && month <= 11) return 'Осень';
        return 'Зима';
    };

    flights.forEach((flight) => {
        const date = new Date(flight.departureDate);
        const month = date.getMonth() + 1;
        const season = getSeason(month);
        seasonalTicketCounts[season] = (seasonalTicketCounts[season] || 0) + flight.ticketCount;
    });

    return (
        <table>
            {checkButton === 'general' && (
                <React.Fragment>
                    <thead>
                        <tr>
                            <th className="tableHeaderElement">Дата</th>
                            <th className="tableHeaderElement">кол-во проданных билетов</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(dailyTicketCounts)
                            .sort()
                            .map((date) => (
                                <tr key={date}>
                                    <td className="tableElement">{date}</td>
                                    <td className="tableElement">{dailyTicketCounts[date]}</td>
                                </tr>
                            ))}
                    </tbody>
                </React.Fragment>
            )}

            {checkButton === 'routes' && (
                <React.Fragment>
                    <thead>
                        <tr>
                            <th className="tableHeaderElement">Маршрут</th>
                            <th className="tableHeaderElement">Тип транспорта</th>
                            <th className="tableHeaderElement">Загрузка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <tr key={flight.id}>
                                <td className="tableElement">{flight.route}</td>
                                <td className="tableElement">{flight.transportType}</td>
                                <td className="tableElement">{flight.ticketCount * 100 / flight.ticketCount}%</td>
                                {/* ticketCount во втором случае надо поменять на кол-во билетов всего*/}
                            </tr>
                        ))}
                    </tbody>
                </React.Fragment>
            )}


            {checkButton === 'seasons' && (
                <React.Fragment>
                    <thead>
                        <tr>
                            <th className="tableHeaderElement">Время года</th>
                            <th className="tableHeaderElement">Куплено билетов</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(seasonalTicketCounts).map(([season, count]) => (
                            <tr key={season}>
                                <td className="tableElement">{season}</td>
                                <td className="tableElement">{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </React.Fragment>
            )}

        </table>
    );
};

export default FlightTable;
