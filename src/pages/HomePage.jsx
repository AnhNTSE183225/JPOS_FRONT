import NavigationBar from "../components/NavigationBar";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

const HomePage = () => {
    return (
        <div>
            <NavigationBar/>
            <div>
                <h1>Home page</h1>
            </div>
        </div>
    )
}

export default HomePage;