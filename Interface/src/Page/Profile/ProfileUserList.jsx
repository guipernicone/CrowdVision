import React, {useState, useEffect} from 'react';
import { ProfileUserListStyle } from 'Page/Profile/Style/ProfileUserListStyle'
import { getUserListFromParent, deleteUser } from 'Service/UserService'
import DeleteIcon from '@material-ui/icons/Delete';
import CookieService from 'Service/CookieService';

const ProfileUserList = () => {

    const [userList, setUserList] = useState([]);
    
    const userName = (new CookieService()).get('login').user.name

    useEffect(() => {
        getUserListFromParent()
        .then( response =>{
            if (response.status === 200)
            {
                console.log(response.data)
                setUserList(response.data)
            }
        })
        .catch( error =>{
            console.log(error);
        })
    }, [])
    
    const callDeleteUser = (id) => {
        deleteUser(id)
        .then( response => {
            console.log(response);
            if (response.status === 200)
            {
                let newList = userList.filter(user => {
                    if(user.id != id) {
                        return user
                    }
                })
                setUserList(newList);
            }
        })
        .catch( error => {
            console.log(error)
        })
    }

    const buildUserList = () => {
        return userList.map( (user, index) => {
            return (
                <div key={"user_list_" + index} className="user-item">
                    <div className="user-name">{user.name}</div>
                    <div className="delete-icon" onClick={() => callDeleteUser(user.id)}><DeleteIcon style={{color:"red"}}/></div>
                </div>
            )
        })
    }
    return (
        <ProfileUserListStyle>
            <div className="title-list">Usuários supervisionados por {userName}</div>
            {buildUserList()}
        </ProfileUserListStyle>
    );
};

export default ProfileUserList;