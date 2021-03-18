import Connections from '../components/Connections';
import MyNavbar from '../components/MyNavbar';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { Container } from 'react-bootstrap';

const ConnectionsPage = () => {
    const { auth, dispatch } = useAuth();

    if (!auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
  

    return(
        <div className="cont">
            <MyNavbar />
            <Connections />
        </div>
    );
}

export default ConnectionsPage;