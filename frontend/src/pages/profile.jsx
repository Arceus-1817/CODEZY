import { useCallback, useEffect, useState } from "react";
import LoginService from "../services/LoginService";
const profile = () => {
    const [name , setName]=useState('');
    const fetchUsername = useCallback( async () => {
        const response = await LoginService.getUsername();
        console.log('response-',response)
        setName(response.data)
    }, []);
    useEffect(() => {
        fetchUsername();
    }, [fetchUsername]);

  return <div>Username is {name}</div>;
}
export default profile;