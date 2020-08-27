import React, {memo} from 'react';
import TitleDivisor from 'Components/TitleDivisor/TitleDivisor'
import TimeField from 'react-simple-timefield';
import { StatisticsDateInputStyle} from 'Page/Statistics/Form/Style/StatisticsDateInputStyle'
import { registerLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt-BR';

const StatisticsDateInput = ({date, onDateChange, time, onTimeChange}) => {
    registerLocale('pt', pt)
    return (
        <StatisticsDateInputStyle>
            <TitleDivisor title="Periodo de Busca" width="85%"/>
            <div className="select-date">
                <div className="input-fields">
                    <input type="date" className="date-input" value={date[0]} onChange={(event) => onDateChange(event.target.value, "start")}/>
                    <TimeField 
                        value={time[0]}
                        input={<input type="text" className="time-input"/>}
                        showSeconds ={true}
                        onChange={(event,value) => onTimeChange(value, "start")}
                    />
                </div>
                <span style={{fontSize:"20px", paddingTop:"20px"}}>até</span>
                <div className="input-fields">
                    <input type="date" className="date-input" value={date[1]} onChange={(event) => onDateChange(event.target.value, "end")}/>
                    <TimeField 
                        value={time[1]}
                        input={<input type="text" className="time-input"/>}
                        showSeconds ={true}
                        onChange={(event,value) => onTimeChange(value, "end")}
                    />
                </div>
            </div>
        </StatisticsDateInputStyle>
    );
};

export default memo(StatisticsDateInput);