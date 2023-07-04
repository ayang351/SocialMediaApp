import { hasPointerEvents } from '@testing-library/user-event/dist/utils'
import {auth, provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from "react-router-dom"

export const Login = () => {
    //navigate declaration - hook that navigates users to a new page
    const navigate = useNavigate();

    //function that triggers the sign in with google pop-up
    const signInWithGoogle = async () => {
        //result variable will store the google account info the user logs in with
        const result = await signInWithPopup(auth, provider);
        //checking result
        console.log(result);
        //once user is logged in, it will redirect them to a new page
        navigate('/');
    }
    
    return (
    <div> <p> sign in with Google to Continue </p> 
    <button onClick={signInWithGoogle}> Sign In with Google </button>
    </div>
    );
}
