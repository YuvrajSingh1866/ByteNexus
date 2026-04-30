import React from 'react';
const About = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <iframe
                src="http://localhost:5000/about"
                title="About Us"
                style={{ width: '100%', height: '100%', border: 'none' }}
            />
        </div>
    );
};
export default About;