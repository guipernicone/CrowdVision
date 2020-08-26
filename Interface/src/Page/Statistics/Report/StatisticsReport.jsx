import React, {memo} from 'react';
import { StatisticsReportStyle} from 'Page/Statistics/Report/Style/StatisticsReportStyle'
import StatisticsGeneralInformation from 'Page/Statistics/Report/StatisticsGeneralInformation'
import StatisticsNotFoundPage from 'Page/Statistics/Report/StatisticsNotFoundPage'

const StatisticsReport = ({statistics}) => {
    return (
        <StatisticsReportStyle>
            {
                !statistics.hasOwnProperty("dataNotFound") ? 
                    <>
                        <div className="title">Relatório</div>
                        <StatisticsGeneralInformation content={statistics["totalStatusStatistics"]} title={"Informações Gerais"}/>
                        <StatisticsGeneralInformation content={statistics["positiveDetectonsStatistics"]} title={"Detecções Positivas"} pieChart={false}/>
                        <StatisticsGeneralInformation content={statistics["falseDetectonsStatistics"]} title={"Detecções Falsas"} pieChart={false}/>
                    </>
                :
                    <StatisticsNotFoundPage/>
            }
        </StatisticsReportStyle>
    );
};

export default memo(StatisticsReport);