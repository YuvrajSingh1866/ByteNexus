import React from 'react';
const About = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <iframe
                src="import.meta.env.VITE_API_URL/about"
                title="About Us"
                style={{ width: '100%', height: '100%', border: 'none' }}
            />
        </div>
    );
};
export default About;