import { useState } from 'react';
import Chatbot from '../components/Chatbot';
import { FaMapMarkedAlt, FaCompass, FaGlobe, FaStar, FaPlane, FaHotel, FaCamera } from 'react-icons/fa';

function Explore() {
    const [activeTab, setActiveTab] = useState('chat');

    const quickOptions = [
        { icon: FaPlane, title: 'Flight Deals', description: 'Find the best flight prices' },
        { icon: FaHotel, title: 'Hotels', description: 'Discover amazing accommodations' },
        { icon: FaCamera, title: 'Attractions', description: 'Must-see places and activities' },
        { icon: FaMapMarkedAlt, title: 'City Guides', description: 'Comprehensive travel guides' }
    ];

    const popularDestinations = [
        { name: 'Paris, France', image: '🇫🇷', rating: 4.8, reviews: '2.3k' },
        { name: 'Tokyo, Japan', image: '🇯🇵', rating: 4.9, reviews: '1.8k' },
        { name: 'New York, USA', image: '🇺🇸', rating: 4.7, reviews: '3.1k' },
        { name: 'Bali, Indonesia', image: '🇮🇩', rating: 4.8, reviews: '1.5k' },
        { name: 'Dubai, UAE', image: '🇦🇪', rating: 4.6, reviews: '2.7k' },
        { name: 'London, UK', image: '🇬🇧', rating: 4.7, reviews: '2.9k' }
    ];

    return (
        <div className="page">
            <div className="container" style={{ paddingTop: '20px' }}>
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                        <FaCompass style={{ fontSize: '2.5rem', color: '#0066cc' }} />
                        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0066cc', margin: 0 }}>
                            Explore the World
                        </h1>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Chat with our AI travel assistant or browse popular destinations to start planning your next adventure.
                    </p>
                </div>

                {/* Quick Options */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    {quickOptions.map((option, index) => {
                        const IconComponent = option.icon;
                        return (
                            <div key={index} className="card" style={{ padding: '25px', textAlign: 'center', cursor: 'pointer' }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    color: '#0066cc',
                                    marginBottom: '15px'
                                }}>
                                    <IconComponent />
                                </div>
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    marginBottom: '10px',
                                    color: '#333'
                                }}>
                                    {option.title}
                                </h3>
                                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                                    {option.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                    {/* Chat Section */}
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        {/* Tab Header */}
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #dee2e6',
                            backgroundColor: '#f8f9fa'
                        }}>
                            <button
                                onClick={() => setActiveTab('chat')}
                                style={{
                                    flex: 1,
                                    padding: '15px 25px',
                                    border: 'none',
                                    backgroundColor: activeTab === 'chat' ? 'white' : 'transparent',
                                    color: activeTab === 'chat' ? '#0066cc' : '#666',
                                    fontWeight: activeTab === 'chat' ? '600' : 'normal',
                                    cursor: 'pointer',
                                    borderBottom: activeTab === 'chat' ? '2px solid #0066cc' : 'none'
                                }}
                            >
                                AI Assistant
                            </button>
                            <button
                                onClick={() => setActiveTab('search')}
                                style={{
                                    flex: 1,
                                    padding: '15px 25px',
                                    border: 'none',
                                    backgroundColor: activeTab === 'search' ? 'white' : 'transparent',
                                    color: activeTab === 'search' ? '#0066cc' : '#666',
                                    fontWeight: activeTab === 'search' ? '600' : 'normal',
                                    cursor: 'pointer',
                                    borderBottom: activeTab === 'search' ? '2px solid #0066cc' : 'none'
                                }}
                            >
                                Quick Search
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div style={{ padding: '25px' }}>
                            {activeTab === 'chat' ? (
                                <Chatbot />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: '500',
                                            color: '#333'
                                        }}>
                                            Where do you want to go?
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Search destinations..."
                                            className="input"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontWeight: '500',
                                                color: '#333'
                                            }}>
                                                Check-in
                                            </label>
                                            <input type="date" className="input" style={{ width: '100%' }} />
                                        </div>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontWeight: '500',
                                                color: '#333'
                                            }}>
                                                Check-out
                                            </label>
                                            <input type="date" className="input" style={{ width: '100%' }} />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" style={{ width: '100%' }}>
                                        Search Trips
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Popular Destinations Sidebar */}
                    <div className="card" style={{ padding: '25px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <FaGlobe style={{ fontSize: '1.5rem', color: '#0066cc' }} />
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: 0 }}>
                                Popular Destinations
                            </h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {popularDestinations.map((destination, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                        e.currentTarget.style.borderColor = '#0066cc';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.borderColor = '#dee2e6';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{destination.image}</span>
                                        <div>
                                            <div style={{ fontWeight: '500', color: '#333', fontSize: '0.95rem' }}>
                                                {destination.name}
                                            </div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                color: '#666',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <FaStar style={{ color: '#ffc107', fontSize: '0.7rem' }} />
                                                {destination.rating} ({destination.reviews})
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explore;