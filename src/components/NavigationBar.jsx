import { Link } from 'react-router-dom';
import './NavigationBar.css'

const NavigationBar = () => {
    return (
        <div className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/diamond-price-list'>Diamond price list</Link>
            <Link to='/custom-design'>Request a custom design</Link>
        </div>
    )
}

export default NavigationBar;