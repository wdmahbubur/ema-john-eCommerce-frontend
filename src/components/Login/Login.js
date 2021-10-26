import React from 'react';
import useAuth from '../../hooks/useAuth/useAuth';

const Login = () => {
    const { googleSignIn } = useAuth();
    return (
        <div>
            <button onClick={googleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;