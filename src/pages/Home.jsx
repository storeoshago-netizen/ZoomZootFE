import { useNavigate } from 'react-router-dom';
import { FaRocket, FaGlobe, FaMapMarkedAlt, FaPlane, FaArrowRight } from 'react-icons/fa';
import PDFTestButton from "../components/PDFTestButton";

function Home() {
    const navigate = useNavigate();

    const features = [
        {
            icon: FaRocket,
            title: 'AI-Powered Planning',
            description: 'Get personalized itineraries crafted by advanced AI technology'
        },
        {
            icon: FaGlobe,
            title: 'Global Destinations',
            description: 'Discover amazing places around the world with insider tips'
        },
        {
            icon: FaMapMarkedAlt,
            title: 'Smart Recommendations',
            description: 'Find hidden gems and popular attractions tailored to your interests'
        }
    ];

    const stats = [
        { number: '10K+', label: 'Happy Travelers' },
        { number: '150+', label: 'Countries' },
        { number: '500K+', label: 'Trips Planned' },
        { number: '4.9★', label: 'User Rating' }
    ];

    return (
        <div className="page">
            {/* Hero Section */}
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: '#0066cc',
                        marginBottom: '20px'
                    }}>
                        Plan Your Dream Trip
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#666',
                        marginBottom: '30px',
                        maxWidth: '600px',
                        margin: '0 auto 30px'
                    }}>
                        Discover the world with our AI-powered travel assistant.
                        Get personalized recommendations and create unforgettable adventures.
                    </p>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate('/explore')}
                            className="btn btn-primary"
                        >
                            Start Planning <FaArrowRight style={{ marginLeft: '8px' }} />
                        </button>
                        <button className="btn btn-secondary">
                            Learn More
                        </button>
                    </div>

                    {/* Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '20px',
                        marginTop: '60px',
                        maxWidth: '600px',
                        margin: '60px auto 0'
                    }}>
                        {stats.map((stat, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    color: '#0066cc',
                                    marginBottom: '5px'
                                }}>
                                    {stat.number}
                                </div>
                                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <PDFTestButton /> */}
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '60px 20px', backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>
                            Why Choose ZoomZoot?
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                            Experience the future of travel planning with our cutting-edge features
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div key={index} className="card" style={{ textAlign: 'center', padding: '30px' }}>
                                    <div style={{
                                        fontSize: '3rem',
                                        color: '#0066cc',
                                        marginBottom: '20px'
                                    }}>
                                        <IconComponent />
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.3rem',
                                        marginBottom: '15px',
                                        color: '#333'
                                    }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{ color: '#666', lineHeight: '1.6' }}>
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '60px 20px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="card" style={{
                        background: '#0066cc',
                        color: 'white',
                        padding: '40px',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <FaPlane style={{ fontSize: '3rem', marginBottom: '20px' }} />
                        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
                            Ready for Your Next Adventure?
                        </h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9 }}>
                            Join thousands of travelers who trust ZoomZoot to plan their perfect trips.
                            Start your journey today!
                        </p>
                        <button
                            onClick={() => navigate('/explore')}
                            style={{
                                background: 'white',
                                color: '#0066cc',
                                border: 'none',
                                padding: '12px 30px',
                                borderRadius: '5px',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            Get Started Now <FaArrowRight />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;