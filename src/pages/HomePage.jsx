import styles from '/src/css/HomePage.module.css';
import NavigationBar from '../components/NavigationBar';
import Logo from '../assets/Logo.png';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {


    return (
        <>
            <NavigationBar />
            <div className={`${styles['home-page']}`}>
                <section className={`${styles['home']}`}>
                    <video src="https://media2.bulgari.com/video/upload/f_auto,q_auto/v1716383679/homepage/brand-campaign/2024/bulgari_ER_Heromovie_10s_withoutbands_VI_16-9_4k_1.mp4" autoPlay loop muted playsInline>
                    </video>
                </section>
                <section className={`${styles['row']}`}>
                    <img className='img-slide img-fluid' src="https://ecommo--ion.bluenile.com/static-dyo-bn/DYO_Banner.dde8f.jpg" alt="choose_settings" />
                    <div className={`${styles[`overlay-content`]} col-xl-5`}>
                        <img src={Logo} alt="Logo" style={{ width: '6vw', height: 'auto' }} />
                        <h2>Design Your Own Engagement Ring</h2>
                        <p>Bring your love to life with a handcrafted design that perfectly suits your relationship, budget and style.
                            Our expert artisans will pour their passion into every detail of your beautiful custom engagement ring.</p>
                        <a href="/build-your-own/choose-setting"><button>Shop Settings</button></a>
                        <button>Shop Diamonds</button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HomePage;
