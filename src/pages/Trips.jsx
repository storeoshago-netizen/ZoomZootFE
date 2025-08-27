import { useState } from 'react';
import { FaSuitcase, FaPlane, FaCalendarAlt, FaMapMarkerAlt, FaHeart, FaPlus, FaStar, FaClock, FaUsers } from 'react-icons/fa';

function Trips() {
    const [activeTab, setActiveTab] = useState('upcoming');

    const trips = {
        upcoming: [
            {
                id: 1,
                destination: 'Paris, France',
                dates: 'Dec 15-22, 2024',
                duration: '7 days',
                travelers: 2,
                image: '🇫🇷',
                status: 'confirmed',
                progress: 85,
                activities: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise'],
                budget: '$2,500'
            },
            {
                id: 2,
                destination: 'Tokyo, Japan',
                dates: 'Jan 10-20, 2025',
                duration: '10 days',
                travelers: 1,
                image: '🇯🇵',
                status: 'planning',
                progress: 45,
                activities: ['Shibuya Crossing', 'Mount Fuji', 'Traditional Temples'],
                budget: '$3,200'
            }
        ],
        past: [
            {
                id: 3,
                destination: 'Bali, Indonesia',
                dates: 'Oct 5-15, 2024',
                duration: '10 days',
                travelers: 2,
                image: '🇮🇩',
                status: 'completed',
                rating: 5,
                activities: ['Ubud Rice Terraces', 'Beach Hopping', 'Temple Tours'],
                budget: '$1,800'
            }
        ],
        wishlist: [
            {
                id: 4,
                destination: 'New York, USA',
                image: '🇺🇸',
                priority: 'high',
                estimatedBudget: '$2,000',
                notes: 'Broadway shows and Central Park'
            },
            {
                id: 5,
                destination: 'Dubai, UAE',
                image: '🇦🇪',
                priority: 'medium',
                estimatedBudget: '$3,500',
                notes: 'Luxury shopping and desert safari'
            }
        ]
    };

    return (
        <div className="page">
            <div className="container" style={{ paddingTop: '20px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                        <FaSuitcase style={{ fontSize: '2.5rem', color: '#0066cc' }} />
                        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0066cc', margin: 0 }}>
                            My Trips
                        </h1>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Manage your travel plans, track your adventures, and organize your dream destinations.
                    </p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                    <div style={{
                        display: 'flex',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        padding: '4px',
                        border: '1px solid #dee2e6'
                    }}>
                        {[
                            { key: 'upcoming', label: 'Upcoming', icon: FaPlane },
                            { key: 'past', label: 'Past Trips', icon: FaMapMarkerAlt },
                            { key: 'wishlist', label: 'Wishlist', icon: FaHeart }
                        ].map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 20px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: activeTab === tab.key ? '#0066cc' : 'transparent',
                                        color: activeTab === tab.key ? 'white' : '#666',
                                        fontWeight: activeTab === tab.key ? '600' : 'normal',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <IconComponent size={16} />
                                    {tab.label}
                                    {tab.key === 'upcoming' && (
                                        <span style={{
                                            marginLeft: '8px',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            background: activeTab === tab.key ? 'rgba(255, 255, 255, 0.2)' : '#0066cc',
                                            color: 'white'
                                        }}>
                                            {trips.upcoming.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div>
                    {activeTab === 'upcoming' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', margin: 0 }}>
                                    Upcoming Adventures
                                </h2>
                                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FaPlus size={14} />
                                    Plan New Trip
                                </button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
                                {trips.upcoming.map((trip) => (
                                    <div key={trip.id} className="card" style={{ padding: '25px' }}>
                                        {/* Trip Header */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '2rem' }}>{trip.image}</span>
                                                <div>
                                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: '0 0 5px 0' }}>
                                                        {trip.destination}
                                                    </h3>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.85rem', color: '#666' }}>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <FaCalendarAlt size={12} />
                                                            {trip.dates}
                                                        </span>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <FaClock size={12} />
                                                            {trip.duration}
                                                        </span>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <FaUsers size={12} />
                                                            {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                background: trip.status === 'confirmed' ? '#d4edda' : '#cce5ff',
                                                color: trip.status === 'confirmed' ? '#155724' : '#004085'
                                            }}>
                                                {trip.status}
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div style={{ marginBottom: '15px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                                                <span style={{ color: '#666' }}>Planning Progress</span>
                                                <span style={{ color: '#333' }}>{trip.progress}%</span>
                                            </div>
                                            <div style={{ width: '100%', background: '#e9ecef', borderRadius: '4px', height: '8px' }}>
                                                <div style={{
                                                    height: '8px',
                                                    borderRadius: '4px',
                                                    width: `${trip.progress}%`,
                                                    background: '#0066cc',
                                                    transition: 'width 0.3s ease'
                                                }}></div>
                                            </div>
                                        </div>

                                        {/* Activities */}
                                        <div style={{ marginBottom: '15px' }}>
                                            <h4 style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '8px' }}>
                                                Planned Activities
                                            </h4>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {trip.activities.map((activity, index) => (
                                                    <span key={index} style={{
                                                        fontSize: '0.75rem',
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                        background: '#f8f9fa',
                                                        color: '#666',
                                                        border: '1px solid #dee2e6'
                                                    }}>
                                                        {activity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Budget */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: '500', color: '#333' }}>
                                                Budget: {trip.budget}
                                            </span>
                                            <button className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'past' && (
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '25px' }}>
                                Past Adventures
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
                                {trips.past.map((trip) => (
                                    <div key={trip.id} className="card" style={{ padding: '25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                                            <span style={{ fontSize: '2rem' }}>{trip.image}</span>
                                            <div>
                                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: 0 }}>
                                                    {trip.destination}
                                                </h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>Your Rating:</span>
                                                    <div style={{ display: 'flex' }}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                style={{
                                                                    color: i < trip.rating ? '#ffc107' : '#dee2e6',
                                                                    fontSize: '0.8rem'
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>
                                            {trip.dates} • {trip.duration} • Budget: {trip.budget}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '8px' }}>
                                                Highlights
                                            </h4>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {trip.activities.map((activity, index) => (
                                                    <span key={index} style={{
                                                        fontSize: '0.75rem',
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                        background: '#f8f9fa',
                                                        color: '#666',
                                                        border: '1px solid #dee2e6'
                                                    }}>
                                                        {activity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'wishlist' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', margin: 0 }}>
                                    Dream Destinations
                                </h2>
                                <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FaPlus size={14} />
                                    Add Destination
                                </button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                                {trips.wishlist.map((trip) => (
                                    <div key={trip.id} className="card" style={{ padding: '25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '2rem' }}>{trip.image}</span>
                                                <div>
                                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: 0 }}>
                                                        {trip.destination}
                                                    </h3>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        padding: '2px 8px',
                                                        borderRadius: '8px',
                                                        background: trip.priority === 'high' ? '#ffebee' : '#fff3e0',
                                                        color: trip.priority === 'high' ? '#c62828' : '#e65100'
                                                    }}>
                                                        {trip.priority} priority
                                                    </span>
                                                </div>
                                            </div>
                                            <FaHeart style={{ color: '#e91e63', fontSize: '1.2rem' }} />
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                                            {trip.notes}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '500', color: '#333' }}>
                                                Est. {trip.estimatedBudget}
                                            </span>
                                            <button className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                                                Start Planning
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Trips;