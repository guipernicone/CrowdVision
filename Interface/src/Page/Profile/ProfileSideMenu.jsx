import React, {memo} from 'react';
import { ProfileSideMenuStyle } from 'Page/Profile/Style/ProfileSideMenuStyle'
import Colors from 'Config/Colors'

/**
 * A side menu for the profile page
 * 
 *  @param {array} options A array of options to be created
 *  @param {func} optionHandler A function to handler button options
 *  @param {array} selectedOption The actual selected option
 */
const ProfileSideMenu = ({options, optionHandler, selectedOption}) => {

    const buildMenuOptions = () => {
        
        return options.map( (optionItem, index) => {

            return (
                <div 
                    key={"optionItem_" + index}
                    className="menu-option"
                    onClick={() => optionHandler(optionItem)}
                    style={{backgroundColor: selectedOption === optionItem ? Colors.tertiary : Colors.secundary}}
                >
                    {optionItem}
                </div>
            )
        })
    }
    return (
        <ProfileSideMenuStyle>
            {buildMenuOptions()}
        </ProfileSideMenuStyle>
    );
};

export default memo(ProfileSideMenu);