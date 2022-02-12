import React from 'react'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import QueryBuilder from './QueryBuilder';

export const QueryPage = () => {
    return (
        <GridContainer>
            <GridItem xs={12}>
                <Card>
                    <CardBody>
                        <QueryBuilder />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}
