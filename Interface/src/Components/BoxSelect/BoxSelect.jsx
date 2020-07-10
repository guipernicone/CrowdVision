import React, {memo, useState, useEffect} from 'react';
import { BoxSelectStyle } from 'Components/BoxSelect/BoxSelectStyle'
import { getUserCameras } from 'Service/UserService';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import ExploreIcon from '@material-ui/icons/Explore';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Button } from 'react-bootstrap';

/**
 * A component with two field, one to display and select a option and 
 * another to diplay that selected option
 * 
 * 
 * @param {Array} content An array of objects of with the field id, name
 */
const BoxSelect = ({content, selectContent, onSelectItem, onSelectAll, onDeleteItem, title}) => {
    const buildCameraList = () => {
        let cameraList = [];
        cameraList = content.map((item, index) => {
            return (
                <div key={"list" + index} className="item-list">
                    <span style={{cursor: "default"}}>{item.name}</span>
                    <AddCircleOutlineIcon 
                        className="add-icon"
                        onClick={() => onSelectItem(item)}
                    />
                </div>
            )
        })

        return cameraList
    }

    const buildSelectList = () => {
        let selectedList = [];
        selectedList = selectContent.map((selectedItem, index) => {
            return (
                <div key={"select" + index} className="item-list">
                    <span style={{cursor: "default", paddingRight: "7.5px"}}>{index < 10 ? ("0" + (index + 1)) : (index + 1)}</span>
                    |
                    <span style={{cursor: "default", paddingLeft: "7.5px"}}>{selectedItem.name}</span>
                    <DeleteIcon
                        className="remove-icon"
                        onClick={() => onDeleteItem(selectedItem.id)}
                    />
                </div>
            )
        })

        return selectedList
    }

    return (
        <BoxSelectStyle>
            <div className="item-list-box">
                <div className="select-title">Selecionar {title}</div>
                {buildCameraList()}
            </div>
            <div style={{position: "relative"}}>
                <Button className="select-all-buttom">
                    <DoubleArrowRoundedIcon onClick={onSelectAll}/>
                </Button>
            </div>
            <div className="select-list-box">
                <div className="select-title">{title} Selecionadas</div>
                {buildSelectList()}
            </div>
        </BoxSelectStyle>
    );
};

export default memo(BoxSelect);