import { useState, useRef, useEffect } from 'react';
import {
    FaPaperPlane,
    FaRobot,
    FaUser,
    FaSpinner,
    FaMicrophone,
    FaSmile,
    FaDownload,
    FaFilePdf
} from 'react-icons/fa';
import { generatePDFFromMarkdown } from '../utils/pdfGenerator';

// Backend API configuration
const API_BASE_URL = 'https://web-production-7739.up.railway.app'; // Adjust this to your backend URL

function Chatbot() {
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm ZoomZoot, your AI travel planning assistant. I can help you discover amazing destinations, plan itineraries, find flights, hotels, and create the perfect trip based on your preferences. What adventure are you dreaming of today?",
            sender: 'bot',
            timestamp: new Date()
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [tripPlanAvailable, setTripPlanAvailable] = useState(false);
    const messagesEndRef = useRef(null);

    // Generate session ID on component mount
    useEffect(() => {
        const generateSessionId = () => {
            return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        };
        setSessionId(generateSessionId());
    }, []);

    // Check backend connection
    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/`);
                if (response.ok) {
                    setIsConnected(true);
                }
            } catch (error) {
                console.log('Backend not connected:', error);
                setIsConnected(false);
            }
        };

        checkConnection();
        // Check connection every 30 seconds
        const interval = setInterval(checkConnection, 30000);
        return () => clearInterval(interval);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickSuggestions = [
        "Plan a weekend trip to Paris",
        "Best beaches in Southeast Asia",
        "Budget travel tips for Europe",
        "Adventure activities in New Zealand"
    ];

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim() && sessionId) {
            const userMessage = {
                text: input,
                sender: 'user',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, userMessage]);
            setInput('');
            setIsTyping(true);

            try {
                // Call backend API
                const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sessionId: sessionId,
                        message: input.trim(),
                        destination: null,
                        days: null,
                        preferences: null
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                const botResponse = {
                    text: data.message,
                    sender: 'bot',
                    timestamp: new Date(),
                    finished: data.finished
                };

                // Enable PDF download if trip plan is finished
                if (data.finished) {
                    setTripPlanAvailable(true);
                }

                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);

            } catch (error) {
                console.error('Error calling backend:', error);

                // Fallback response in case of error
                const errorResponse = {
                    text: "I'm sorry, I'm having trouble connecting to my services right now. Please try again in a moment. In the meantime, I'd be happy to help you plan your trip once the connection is restored! ðŸ”„",
                    sender: 'bot',
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, errorResponse]);
                setIsTyping(false);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
    };

    const handleDownloadPDF = async () => {
        if (!tripPlanAvailable || !sessionId) return;

        try {
            // Get the markdown content from backend
            const response = await fetch(`${API_BASE_URL}/api/v1/download-pdf/${sessionId}`);

            if (!response.ok) {
                throw new Error('Failed to download markdown');
            }

            // Get the raw markdown text
            const markdownContent = await response.text();

            // Generate PDF from markdown using our utility
            const filename = `ZoomZoot-TripPlan-${sessionId}.pdf`;
            const success = generatePDFFromMarkdown(markdownContent, filename);

            if (!success) {
                throw new Error('Failed to generate PDF');
            }

            // PDF download handled by the generator
            console.log('PDF generated and downloaded successfully');

        } catch (error) {
            console.error('Error downloading trip plan:', error);
            alert('Failed to download trip plan. Please try again.');
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="chatbot-container max-w-full">
            <div
                className="bg-transparent rounded-none border-none shadow-none p-0"
                style={{ background: 'transparent' }}
            >
                {/* Chat Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '16px',
                    borderBottom: '1px solid #e5e7eb',
                    background: '#f9fafb'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '20px',
                            background: '#0066cc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaRobot style={{ color: 'white', fontSize: '18px' }} />
                        </div>
                        <div>
                            <h3 style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#111827',
                                margin: 0,
                                marginBottom: '2px'
                            }}>
                                ZoomZoot AI Assistant
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#6b7280',
                                margin: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: isConnected ? '#10b981' : '#ef4444'
                                }}></span>
                                {isConnected ? 'Online â€¢ Ready to help plan your trip' : 'Offline â€¢ Connecting to services...'}
                            </p>
                        </div>
                    </div>

                    {/* Download PDF Button */}
                    <button
                        onClick={handleDownloadPDF}
                        disabled={!tripPlanAvailable || !isConnected}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            background: tripPlanAvailable && isConnected ? '#0066cc' : '#e5e7eb',
                            color: tripPlanAvailable && isConnected ? 'white' : '#9ca3af',
                            cursor: tripPlanAvailable && isConnected ? 'pointer' : 'not-allowed',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (tripPlanAvailable && isConnected) {
                                e.target.style.background = '#0052a3';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (tripPlanAvailable && isConnected) {
                                e.target.style.background = '#0066cc';
                            }
                        }}
                    >
                        <FaFilePdf style={{ fontSize: '14px' }} />
                        Download PDF
                    </button>
                </div>

                {/* Messages Container */}
                <div style={{
                    height: '350px',
                    overflowY: 'auto',
                    padding: '16px',
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                                animation: 'fadeIn 0.3s ease-in'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                maxWidth: '85%',
                                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                            }}>
                                {/* Avatar */}
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '16px',
                                    background: msg.sender === 'bot' ? '#0066cc' : '#10b981',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {msg.sender === 'bot' ? (
                                        <FaRobot style={{ color: 'white', fontSize: '14px' }} />
                                    ) : (
                                        <FaUser style={{ color: 'white', fontSize: '14px' }} />
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div style={{
                                    background: msg.sender === 'bot' ? '#f3f4f6' : '#0066cc',
                                    color: msg.sender === 'bot' ? '#000000' : 'white',
                                    padding: '12px 16px',
                                    borderRadius: msg.sender === 'bot'
                                        ? '20px 20px 20px 4px'
                                        : '20px 20px 4px 20px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                    wordWrap: 'break-word'
                                }}>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '15px',
                                        lineHeight: '1.5',
                                        color: msg.sender === 'bot' ? '#000000' : 'white'
                                    }}>
                                        {msg.text}
                                    </p>
                                    <div style={{
                                        fontSize: '12px',
                                        opacity: 0.7,
                                        marginTop: '4px',
                                        textAlign: msg.sender === 'user' ? 'right' : 'left',
                                        color: msg.sender === 'bot' ? '#000000' : 'white'
                                    }}>
                                        {formatTime(msg.timestamp)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                maxWidth: '85%'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '16px',
                                    background: '#0066cc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FaRobot style={{ color: 'white', fontSize: '14px' }} />
                                </div>
                                <div style={{
                                    background: '#f3f4f6',
                                    padding: '12px 16px',
                                    borderRadius: '20px 20px 20px 4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                                }}>
                                    <FaSpinner style={{
                                        fontSize: '14px',
                                        color: '#0066cc',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                                        ZoomZoot is typing...
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestions */}
                {messages.length === 1 && (
                    <div style={{
                        padding: '16px',
                        borderTop: '1px solid #e5e7eb',
                        background: '#fafafa'
                    }}>
                        <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '12px',
                            fontWeight: '500'
                        }}>
                            Quick suggestions:
                        </p>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px'
                        }}>
                            {quickSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    style={{
                                        fontSize: '13px',
                                        padding: '8px 14px',
                                        borderRadius: '20px',
                                        border: '1px solid #e5e7eb',
                                        background: 'white',
                                        color: '#374151',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#0066cc';
                                        e.target.style.color = 'white';
                                        e.target.style.borderColor = '#0066cc';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'white';
                                        e.target.style.color = '#374151';
                                        e.target.style.borderColor = '#e5e7eb';
                                    }}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input Form */}
                <div className="p-4 border-t" style={{ borderColor: '#e5e7eb' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '12px',
                        background: 'white',
                        border: '2px solid #f3f4f6',
                        borderRadius: '24px',
                        padding: '12px 16px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        transition: 'all 0.2s ease'
                    }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#0066cc';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.15)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#f3f4f6';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                        }}
                    >
                        <textarea
                            value={input}
                            onChange={(e) => {
                                if (e.target.value.length <= 2000) {
                                    setInput(e.target.value);
                                }
                            }}
                            placeholder={isConnected
                                ? "Type your travel question here..."
                                : "Connecting to ZoomZoot services..."}
                            rows={1}
                            disabled={!isConnected}
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                background: 'transparent',
                                color: isConnected ? '#374151' : '#9ca3af',
                                fontSize: '16px',
                                lineHeight: '24px',
                                minHeight: '24px',
                                maxHeight: '120px',
                                overflow: 'hidden'
                            }}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(e);
                                }
                            }}
                        />

                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping || !isConnected}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '20px',
                                border: 'none',
                                background: (input.trim() && !isTyping && isConnected)
                                    ? '#0066cc'
                                    : '#e5e7eb',
                                color: 'white',
                                cursor: (input.trim() && !isTyping && isConnected) ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                flexShrink: 0
                            }}
                            onMouseEnter={(e) => {
                                if (input.trim() && !isTyping && isConnected) {
                                    e.target.style.background = '#0052a3';
                                    e.target.style.transform = 'scale(1.05)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (input.trim() && !isTyping && isConnected) {
                                    e.target.style.background = '#0066cc';
                                    e.target.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            {isTyping ? (
                                <FaSpinner style={{ fontSize: '16px', animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <FaPaperPlane style={{ fontSize: '16px' }} />
                            )}
                        </button>
                    </div>

                    {/* Character count */}
                    {input.length > 0 && (
                        <div style={{
                            textAlign: 'right',
                            marginTop: '8px',
                            fontSize: '12px',
                            color: '#9ca3af'
                        }}>
                            {input.length}/2000
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chatbot;