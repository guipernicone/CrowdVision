import React, {memo, useState, useEffect} from 'react';
import { getUserInformation } from 'Service/UserService';

const ProfileInformation = () => {
    const [userInformation, setUserInformation] = useState();

    useEffect(() =>{
        getUserInformation()
        .then((response) => {
            if (response.status === 200) {
                return setUserInformation(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

    const buildOrganizações = () => {
        return userInformation.org.map(org => {
            return <div> {org.name} </div>
        })
    }

    return (
        <div>
            {console.log(userInformation)}
            {
               userInformation !== undefined ? 
                    <div>
                        <div>{userInformation.name + ' ' + userInformation.surname}</div>
                        <div>{userInformation.email}</div>
                        <div>{userInformation.permission}</div>
                        <div>Organizações:</div>
                        <div>{buildOrganizações()}</div> 
                    </div>  
                    : null
            }
        </div>
    );
};

export default memo(ProfileInformation);