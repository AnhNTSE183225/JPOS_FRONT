import '../css/HomePage.css';
const HomePage = () => {

    return (
        <>
            <section className="home">
                <div className="container">
                    <video src="https://media2.bulgari.com/video/upload/f_auto,q_auto/v1716383679/homepage/brand-campaign/2024/bulgari_ER_Heromovie_10s_withoutbands_VI_16-9_4k_1.mp4" autoPlay loop muted playsInline></video>
                </div>
                <div className="overlay-text">
                    <h1>ETERNALLY REBORN</h1>
                </div>
            </section>
        </>
    );
};

export default HomePage;
