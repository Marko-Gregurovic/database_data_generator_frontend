import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";


const Connections = (props) => {
    const { auth, dispatch } = useAuth();
    const history = useHistory();
    let error;

    console.log(auth)

    let RequestConnections = {
        token: auth.token
    };

    const REST_API_URL = "https://localhost:44324/user/connections";
    fetch(REST_API_URL, {
        method: 'post',
        body: JSON.stringify(RequestConnections),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) 
            {
                error = true
            }
            
            return response;
        }).then(response => response.json())
        .then(response => {
            if(error) {
                // dispatch({ type: LOGIN_ERROR, isError: true, message: response.message });
                return;
            }

            // dispatch({ types: LOGIN, token: response.token });
            return;
        });

    return (
        <div>

        </div>
    );
}

export default Connections;