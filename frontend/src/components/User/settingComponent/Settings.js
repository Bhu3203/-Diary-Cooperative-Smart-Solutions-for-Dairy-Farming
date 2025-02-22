
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Settings.css';

const Settings = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [notifications, setNotifications] = useState({
        email: false,
        sms: false,
        push: false,
    });
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.body.className = savedTheme;
    }, []);

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        document.body.className = selectedTheme;
        localStorage.setItem('theme', selectedTheme);
    };

    const handleSaveSettings = () => {
        alert('Settings saved successfully!');
    };

    return (
        <Container className="settings-container">
            <h2 className="mb-4 text-center">Settings</h2>
            <Row className="justify-content-center">
                <Col md={8} className="settings-form p-4">
                    <Form>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Notification Preferences</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Email Notifications"
                                checked={notifications.email}
                                onChange={(e) =>
                                    setNotifications({ ...notifications, email: e.target.checked })
                                }
                            />
                            <Form.Check
                                type="checkbox"
                                label="SMS Notifications"
                                checked={notifications.sms}
                                onChange={(e) =>
                                    setNotifications({ ...notifications, sms: e.target.checked })
                                }
                            />
                            <Form.Check
                                type="checkbox"
                                label="Push Notifications"
                                checked={notifications.push}
                                onChange={(e) =>
                                    setNotifications({ ...notifications, push: e.target.checked })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Theme Selection</Form.Label>
                            <div>
                                <Button
                                    variant={theme === 'light' ? 'primary' : 'outline-primary'}
                                    className="me-2"
                                    onClick={() => handleThemeChange('light')}
                                >
                                    Light Mode
                                </Button>
                                <Button
                                    variant={theme === 'dark' ? 'primary' : 'outline-primary'}
                                    onClick={() => handleThemeChange('dark')}
                                >
                                    Dark Mode
                                </Button>
                            </div>
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="success" onClick={handleSaveSettings}>
                                Save Settings
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Settings;
