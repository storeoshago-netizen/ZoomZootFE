import { useState } from 'react';
import { FaCog, FaUser, FaBell, FaShieldAlt, FaPalette, FaSave, FaCamera, FaToggleOn, FaToggleOff } from 'react-icons/fa';

function Settings() {
    const [activeSection, setActiveSection] = useState('profile');
    const [settings, setSettings] = useState({
        profile: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
            bio: 'Travel enthusiast exploring the world one destination at a time.'
        },
        notifications: {
            emailNotifications: true,
            pushNotifications: true,
            tripReminders: true,
            dealAlerts: false,
            newsletter: true
        },
        privacy: {
            profileVisibility: 'public',
            shareLocation: false,
            dataCollection: true
        },
        appearance: {
            theme: 'light',
            language: 'en',
            currency: 'USD'
        }
    });

    const toggleSetting = (section, key) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: !prev[section][key]
            }
        }));
    };

    const updateSetting = (section, key, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const settingSections = [
        { key: 'profile', label: 'Profile', icon: FaUser },
        { key: 'notifications', label: 'Notifications', icon: FaBell },
        { key: 'privacy', label: 'Privacy', icon: FaShieldAlt },
        { key: 'appearance', label: 'Appearance', icon: FaPalette }
    ];

    return (
        <div className="page">
            <div className="container" style={{ paddingTop: '20px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                        <FaCog style={{ fontSize: '2.5rem', color: '#0066cc' }} />
                        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0066cc', margin: 0 }}>
                            Settings
                        </h1>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Customize your ZoomZoot experience and manage your account preferences.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Sidebar */}
                    <div className="card" style={{ padding: '20px', height: 'fit-content' }}>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {settingSections.map((section) => {
                                const IconComponent = section.icon;
                                return (
                                    <button
                                        key={section.key}
                                        onClick={() => setActiveSection(section.key)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 16px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: activeSection === section.key ? '#0066cc' : 'transparent',
                                            color: activeSection === section.key ? 'white' : '#666',
                                            fontWeight: activeSection === section.key ? '600' : 'normal',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (activeSection !== section.key) {
                                                e.target.style.backgroundColor = '#f8f9fa';
                                                e.target.style.color = '#333';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (activeSection !== section.key) {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#666';
                                            }
                                        }}
                                    >
                                        <IconComponent size={16} />
                                        {section.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="card" style={{ padding: '30px' }}>
                        {/* Profile Settings */}
                        {activeSection === 'profile' && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', margin: 0 }}>
                                        Profile Information
                                    </h2>
                                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaSave size={14} />
                                        Save Changes
                                    </button>
                                </div>

                                {/* Avatar Section */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: '#0066cc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '2rem'
                                    }}>
                                        <FaUser />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', marginBottom: '5px' }}>
                                            Profile Picture
                                        </h3>
                                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
                                            Upload a photo to personalize your profile
                                        </p>
                                        <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                            <FaCamera size={12} />
                                            Change Photo
                                        </button>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.profile.firstName}
                                            onChange={(e) => updateSetting('profile', 'firstName', e.target.value)}
                                            className="input"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.profile.lastName}
                                            onChange={(e) => updateSetting('profile', 'lastName', e.target.value)}
                                            className="input"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={settings.profile.email}
                                            onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                                            className="input"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={settings.profile.phone}
                                            onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
                                            className="input"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                        Bio
                                    </label>
                                    <textarea
                                        value={settings.profile.bio}
                                        onChange={(e) => updateSetting('profile', 'bio', e.target.value)}
                                        rows={4}
                                        className="input"
                                        style={{ width: '100%', resize: 'vertical' }}
                                        placeholder="Tell us about your travel style and preferences..."
                                    />
                                </div>
                            </div>
                        )}

                        {/* Notifications Settings */}
                        {activeSection === 'notifications' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '30px' }}>
                                    Notification Preferences
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {[
                                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive important updates via email' },
                                        { key: 'pushNotifications', label: 'Push Notifications', description: 'Get instant notifications on your device' },
                                        { key: 'tripReminders', label: 'Trip Reminders', description: 'Reminders about upcoming trips and bookings' },
                                        { key: 'dealAlerts', label: 'Deal Alerts', description: 'Notifications about special deals and discounts' },
                                        { key: 'newsletter', label: 'Newsletter', description: 'Monthly travel tips and destination guides' }
                                    ].map((notification) => (
                                        <div key={notification.key} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '20px',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '8px',
                                            backgroundColor: '#f8f9fa'
                                        }}>
                                            <div>
                                                <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#333', marginBottom: '5px' }}>
                                                    {notification.label}
                                                </h3>
                                                <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                                                    {notification.description}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => toggleSetting('notifications', notification.key)}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontSize: '1.5rem',
                                                    color: settings.notifications[notification.key] ? '#0066cc' : '#ccc'
                                                }}
                                            >
                                                {settings.notifications[notification.key] ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Privacy Settings */}
                        {activeSection === 'privacy' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '30px' }}>
                                    Privacy & Security
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                            Profile Visibility
                                        </label>
                                        <select
                                            value={settings.privacy.profileVisibility}
                                            onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                                            className="input"
                                            style={{ width: '100%' }}
                                        >
                                            <option value="public">Public</option>
                                            <option value="friends">Friends Only</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>

                                    {[
                                        { key: 'shareLocation', label: 'Share Location', description: 'Allow location sharing for better recommendations' },
                                        { key: 'dataCollection', label: 'Data Collection', description: 'Help improve our services with usage analytics' }
                                    ].map((privacy) => (
                                        <div key={privacy.key} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '20px',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '8px',
                                            backgroundColor: '#f8f9fa'
                                        }}>
                                            <div>
                                                <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#333', marginBottom: '5px' }}>
                                                    {privacy.label}
                                                </h3>
                                                <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                                                    {privacy.description}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => toggleSetting('privacy', privacy.key)}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontSize: '1.5rem',
                                                    color: settings.privacy[privacy.key] ? '#0066cc' : '#ccc'
                                                }}
                                            >
                                                {settings.privacy[privacy.key] ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Appearance Settings */}
                        {activeSection === 'appearance' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '30px' }}>
                                    Appearance & Localization
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                                Language
                                            </label>
                                            <select
                                                value={settings.appearance.language}
                                                onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                                                className="input"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="en">English</option>
                                                <option value="es">Español</option>
                                                <option value="fr">Français</option>
                                                <option value="de">Deutsch</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                                Currency
                                            </label>
                                            <select
                                                value={settings.appearance.currency}
                                                onChange={(e) => updateSetting('appearance', 'currency', e.target.value)}
                                                className="input"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                                <option value="JPY">JPY (¥)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;