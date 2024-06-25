import styles from '/src/css/HomePage.module.css';
import Logo from '../assets/Logo.png';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import useDocumentTitle from '../components/Title';

const HomePage = () => {
    useDocumentTitle('Bijoux Official Website - Jeweler since 2024');
    return (
        <>
            <div className={`${styles['home-page']}`}>
                <section className={`${styles['home']}`}>
                    <video src="https://media2.bulgari.com/video/upload/f_auto,q_auto/v1716383679/homepage/brand-campaign/2024/bulgari_ER_Heromovie_10s_withoutbands_VI_16-9_4k_1.mp4" autoPlay loop muted playsInline>
                    </video>
                    <div className={`${styles[`overlay-content-video`]} col-xl-4`}>
                        <p className='fs-4 text-center'>ENTER THE BIJOUX UNIVERSE</p>
                        <p className='fs-6 text-center'>Introducing Our Glamorous Collections</p>
                        <a className='text-center' href="/build-your-own/choose-setting"><button>EXPLORE FINE JEWELERY</button></a>
                    </div>
                </section>
                <section className={`${styles['row']}`}>
                    <img className={`img-fluid ${styles['img-slide']}`} src="https://ecommo--ion.bluenile.com/static-dyo-bn/DYO_Banner.dde8f.jpg" alt="choose_settings" />
                    <div className={`${styles[`overlay-content`]} col-xl-5`}>
                        <img src={Logo} alt="Logo" style={{ width: '6vw', height: 'auto' }} />
                        <p className='fs-4 fw-semibold text-center'>DESIGN YOUR OWN JEWELERY</p>
                        <p className='fs-6'>Bring your love to life with a handcrafted design that perfectly suits your relationship, budget and style.
                            Our expert artisans will pour their passion into every detail of your beautiful custom engagement ring.</p>
                        <a href="/custom-design"><button style={{ width: "45%" }}>CUSTOM YOUR OWN</button></a>
                        <a href="/diamond-price-list"><button style={{ width: "45%" }}>DISCOVER DIAMOND PRICE LIST</button></a>
                    </div>
                </section>
                <section className={`mt-5 ${styles['row']}`}>
                    <img className={`img-fluid ${styles['img-slide']}`} src="https://ecommo--ion.bluenile.com/static-dyo-bn/lab_diamonds_sale_banner.6a518.jpg" alt="choose_engagement" />
                    <div className={`${styles[`overlay-content`]} col-xl-5`}>
                        <p className='fs-4 fw-semibold text-center'>AN UNFORGETTABLE PROPOSAL</p>
                        <p className='fs-6'>Embark on a journey towards a proposal as unique as your love story. With our bespoke engagement rings,
                            each detail is meticulously crafted to capture the essence of your bond. Let us help you create a moment
                            filled with joy and love, marking the beginning of your forever.</p>
                        <a href="/build-your-own/choose-setting"><button style={{ width: "100%" }}>SHOP SETTINGS</button></a>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HomePage;
