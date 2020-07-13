import React, {memo} from 'react';
import { StatisticsReportStyle} from 'Page/Statistics/Report/Style/StatisticsReportStyle'
import StatisticsGeneralInformation from 'Page/Statistics/Report/StatisticsGeneralInformation'

const StatisticsReport = ({statistics}) => {
    return (
        <StatisticsReportStyle>
            <div className="title">Relatório</div>
            <StatisticsGeneralInformation />
        </StatisticsReportStyle>
    );
};

export default memo(StatisticsReport);