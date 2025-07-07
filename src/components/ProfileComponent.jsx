import React, { useState, useEffect } from 'react';
import '../index.css';

const ProfileComponent = () => {
    const [bioData, setBioData] = useState(null);

    useEffect(() => {
        const fetchBioData = async () => {
            try {
                const response = await fetch('https://api.example.com/bio'); // Replace with actual API URL
                const data = await response.json();
                setBioData(data);
            } catch (error) {
                console.error('Error fetching bio data:', error);
            }
        };

        fetchBioData();
    }, []);

    const getBookRef = (name, surname, title) => {
        return <p> {surname}, {name}. <em>{title}</em> </p>
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <img
                    src="https://via.placeholder.com/300" // Replace with actual image URL
                    alt="Profile"
                    style={styles.image}
                />
            </div>
            <div style={styles.rightSection}>
                <div className={styles.mainHeader}>
                    Pablo David Aranda Rodriguez
                </div>
                <div className="">
                    Robotics engineer and frustrated musician
                </div>
                <p>
                    I am originally from a medium size city in the middle of a desert in the north-east of Spain, which goes by the name of Saragossa. I moved to Odense, Denmark to finish my master studies in Industrial Engineering and pursue a second Masterm this time in Robotics, which I finished in Munich, where I did an exchange semester at the Hochshule Munchen and my Master's Thesis at the Technische Universitat Munchen.
                </p>
                <p>
                    Here in Munich is where I got to find the spot in the world where I managed to find happiness, my girlfriend with whom I've been living for more than a year, and a place and time to exercise all other activities that fill my soul and that give me everything but money(for now), which usually go by the name of hobbies.
                </p>

                <div style={styles.containerInterests}>
                    <div style={styles.leftSectionInterests}>

                        <div className={styles.subHeader}>
                            Active interests:
                        </div>
                        <ul>
                            <li>Classic Control Engineering</li>
                            <li>Computer Vision</li>
                            <li>Navigation for mobile robots</li>
                            <li>Locomotion of legged robots</li>
                            <li>Accounting</li>
                            <li>Sight-reading with guitar</li>
                        </ul>
                    </div>
                    <div style={styles.rightSectionInterests}>
                        <div className={styles.subSectionHeader}>
                            Last read:
                        </div>
                        <p> Ogawa, Yōko. Venganza </p>

                        <div className={styles.subSectionHeader}>
                            Currently reading:
                        </div>

                        {getBookRef("Brandon", "Sanderson", "El archivo de las tormentas (IV): El ritmo de la guerra")}
                        {getBookRef("Franz", "Kafka", "El proceso")}
                    </div>
                </div>
            </div>
        </div >
    );
};

const styles = {
    mainHeader: 'text-white text-4xl font-bold underline text-slate-900',
    subHeader: 'text-white text-2xl font-bold text-slate-800',
    subSectionHeader: ' text-white text-2xl font-bold text-slate-900',
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
    containerInterests: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
    leftSection: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'bg-blue-900',
        color: '#fff0d0',
    },
    rightSection: {
        flex: 1,
        padding: '20px',
        backgroundColor: 'bg-blue-900',
        color: '#fff0d0',
    },
    leftSectionInterests: {
        flex: 1,
        padding: '20px',
    },
    rightSectionInterests: {
        flex: 1,
        padding: '20px',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover',
        borderRadius: 10,
    },
};

export default ProfileComponent;
