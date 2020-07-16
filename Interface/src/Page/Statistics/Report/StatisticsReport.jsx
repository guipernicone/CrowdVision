import React, {memo} from 'react';
import { StatisticsReportStyle} from 'Page/Statistics/Report/Style/StatisticsReportStyle'
import StatisticsGeneralInformation from 'Page/Statistics/Report/StatisticsGeneralInformation'

const StatisticsReport = ({statistics}) => {
    return (
        <StatisticsReportStyle>
            <div className="title">Relatório</div>
            <StatisticsGeneralInformation content={statistics["totalStatusStatistics"]} title={"Informações Gerais"}/>
            <StatisticsGeneralInformation content={statistics["positiveDetectonsStatistics"]} title={"Detecções Poitivas"} pieChart={false}/>
            <StatisticsGeneralInformation content={statistics["falseDetectonsStatistics"]} title={"Detecções Falsas"} pieChart={false}/>
        </StatisticsReportStyle>
    );
};

export default memo(StatisticsReport);