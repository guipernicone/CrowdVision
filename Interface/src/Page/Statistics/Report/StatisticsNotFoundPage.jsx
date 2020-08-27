import React from 'react';
import { StatisticsNotFoundPageStyle } from 'Page/Statistics/Report/Style/StatisticsNotFoundPageStyle'
import { Button } from 'react-bootstrap';

const StatisticsNotFoundPage = () => {
    return (
        <StatisticsNotFoundPageStyle>
            Nenhuma detecção encontrada durante o período selecionado!
            <Button className="button-back" onClick={() => window.location.reload()}>Voltar para a seleção</Button>
        </StatisticsNotFoundPageStyle>
    );
};

export default StatisticsNotFoundPage;