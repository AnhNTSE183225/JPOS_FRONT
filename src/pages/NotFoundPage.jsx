import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            404 not found
            <Link to='/'>Home from link</Link>
            <a href="/">Home from a</a>
        </div>
    )
}

export default NotFoundPage;