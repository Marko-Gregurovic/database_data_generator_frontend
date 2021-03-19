import NewNavbar from 'components/NewNavbar';
import MyNavbar from '../components/MyNavbar';
import PictureSlide from '../components/PictureSlide';

function Homepage(){
    return (
        <div className="cont">
            <MyNavbar />
            <PictureSlide />
        </div>
    );
}

export default Homepage;