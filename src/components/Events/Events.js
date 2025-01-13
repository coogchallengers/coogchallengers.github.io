import React, { useState } from 'react';
import React from 'react'; 
import Calendar from 'react-calendar';
import Layout from '../shared/Layout';
import { FaCalendarAlt } from 'react-icons/fa';
import './Events.css'; // ensure your CSS file includes the new styles


const Events = () => {
    const [date, setDate] = useState(new Date());
    const [filter, setFilter] = useState('all');

    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

    // sample events with categories and descriptions
    const events = [
        { date: '2025-02-05', title: 'First Competition', description: 'First Individual Competition (Data Structures & Data Science) ', category: 'competition', location: 'Student Center South, Rm: 237' },
        { date: '2025-03-17', title: 'Data Science Workshop', description: 'Hands-on machine learning workshop.', category: 'workshop', location: 'Online' },
        { date: '2025-03-19', title: 'Third Competition', description: 'Statewide hackathon challenge.', category: 'competition', location: 'Student Ceneter South, Rm: Dallas' },
        { date: '2025-04-14', title: 'AI Webinar', description: 'Learn the latest trends in AI.', category: 'webinar', location: 'Zoom' },
        { date: '2025-04-16', title: 'Networking Event', description: 'Meet professionals in tech.', category: 'networking', location: 'PGH 232' },
    ];

    // filter events based on category
    const filteredEvents = events.filter(event => filter === 'all' || event.category === filter);

    // get events for the selected date
    const hasEvents = date => {
        const formattedDate = date.toISOString().split('T')[0];
        return filteredEvents.filter(event => event.date === formattedDate);
    };



    const eventDetails = hasEvents(date);

    // sort and display next 3 events
    const upcomingEvents = filteredEvents.filter(event => new Date(event.date) > today).slice(0, 3);

    return (
        <Layout>
            <div className="events-container">
                {/* left Section: Calendar */}
                <div className="calendar-section">
                    <div className="center-container-3">
                        <h1>Upcoming Events <FaCalendarAlt /></h1>
                    </div>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileClassName={({ date }) => {
                            const formattedDate = date.toISOString().split('T')[0];
                            return filteredEvents.some(event => event.date === formattedDate) ? 'has-event' : null;
                        }}
                        minDate={today}
                        maxDate={nextYear}
                        calendarType="gregory"
                        locale="en-US"
                    />
                </div>

                {/* right Section: Event Details */}
                <div className="event-details-section">
                    <div className="filter-section">
                        <label htmlFor="event-filter">Filter Events:</label>
                        <select id="event-filter" onChange={e => setFilter(e.target.value)} value={filter}>
                            <option value="all">All Events</option>
                            <option value="competition">Competitions</option>
                            <option value="workshop">Workshops</option>
                            <option value="webinar">Webinars</option>
                            <option value="networking">Networking</option>
                        </select>
                    </div>

                    {eventDetails.length > 0 ? (
                        <div className="event-details">
                            <h3>Events on {date.toDateString()}:</h3>
                            <ul>
                                {eventDetails.map((event, index) => (
                                    <li key={index} className="event-card">
                                        <h4>{event.title}</h4>
                                        <p><strong>Description:</strong> {event.description}</p>
                                        <p><strong>Location:</strong> {event.location}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="no-events">
                            <p>No events on this date.</p>
                        </div>
                    )}

                    {/* highlight Next 3 Upcoming Events */}
                    <div className="upcoming-events">
                        <h3>Next 3 Events:</h3>
                        <ul>
                            {upcomingEvents.map((event, index) => (
                                <li key={index} className="event-card">
                                    <h4>{event.title} ({event.date})</h4>
                                    <p><strong>Description:</strong> {event.description}</p>
                                    <p><strong>Location:</strong> {event.location}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Events;
