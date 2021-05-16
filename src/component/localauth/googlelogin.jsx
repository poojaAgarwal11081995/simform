import React from 'react';
import {Helper} from "../../action/action"
import { GoogleLogin } from 'react-google-login';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
function Googlelogin() {
    const [cookies , setCookie]  = useCookies(['user']);
    React.useEffect(() => {
        const userdetails =  Helper.getCookie('userDetails');
        if(userdetails !== " "){
        }else{
            window.location.pathname = "/login"
        }
        console.log(userdetails)
     });   
     const responseGoogle = (response) => {
       if(response){

        const userInfo = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            imgUrl: response.profileObj.imageUrl,
            googleId: response.profileObj.googleId,
            access_token: response.tokenObj.access_token,
            token_type: response.tokenObj.token_type,
        };    
        toast("user successfully login");           
        setCookie("userDetails", JSON.stringify(userInfo));
        window.location.pathname = "/profile"
       }else{
           toast("user Can't login succcessfully");
       }        
    }   
    return (
        
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        
    )
}

export default Googlelogin;



