import React, {memo, useState, useEffect} from 'react';
import { getUserInformation } from 'Service/UserService';
import { ProfileInformationStyle } from 'Page/Profile/Style/ProfileInformantionStyle'

const ProfileInformation = () => {
    const [userInformation, setUserInformation] = useState();

    useEffect(() =>{
        getUserInformation()
        .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                return setUserInformation(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

    const buildOrganizações = () => {
        return userInformation.org.map((org, index) => {
            return <div key={"org_" + index}>- {org.name} </div>
        })
    }

    return (
        <ProfileInformationStyle>
            {userInformation !== undefined ?
                <div>
                    <div className="item-profile"> 
                        <div className="label">Nome</div>
                        <div className="info">{userInformation.name + ' ' + userInformation.surname}</div>
                    </div>
                    <div className="item-profile"> 
                        <div className="label">E-mail</div>
                        <div className="info">{userInformation.email}</div>
                    </div>
                    <div className="item-profile"> 
                        <div className="label">Permissão</div>
                        <div className="info">{userInformation.permission}</div>
                    </div>
                    {
                        userInformation.parentUser != undefined ? 
                        <div className="item-profile"> 
                            <div className="label">Usuário Responsavel</div>
                            <div className="item-profile"> 
                                <div className="sub-label">Nome</div>
                                <div className="sub-info">{userInformation.parentUser.name + ' ' + userInformation.parentUser.surname}</div>
                            </div>
                            <div className="item-profile"> 
                                <div className="sub-label">E-mail</div>
                                <div className="sub-info">{userInformation.parentUser.email}</div>
                            </div>
                        </div>
                        : null
                    }
                    <div className="item-profile"> 
                        <div className="label">Organizações</div>
                        <div className="info">{buildOrganizações()}</div>
                    </div>
                </div>
                :null
            }
        </ProfileInformationStyle>
    );
};

export default memo(ProfileInformation);