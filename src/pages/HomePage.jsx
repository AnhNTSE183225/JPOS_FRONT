import '../css/HomePage.css';
import NavigationBar from '../components/NavigationBar';

const HomePage = () => {

    return (
        <>
            <NavigationBar/>
            <section className="home">
                <div className="overlay"></div>
                <video src="https://media2.bulgari.com/video/upload/f_auto,q_auto/v1716383679/homepage/brand-campaign/2024/bulgari_ER_Heromovie_10s_withoutbands_VI_16-9_4k_1.mp4" autoPlay loop muted playsInline></video>
                <div className="homeContent container">
                    <div className="textDiv">
                        <span className="smallText">
                            Our campaign
                        </span>
                        <h1 className='homeTitle'>
                            Reborn
                        </h1>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
