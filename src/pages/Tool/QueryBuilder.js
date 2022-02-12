import React, { useEffect, useState } from "react"
import { Query, Builder, BasicConfig, Utils as QbUtils } from 'react-awesome-query-builder';
import Axios from 'axios';

// For Material-UI widgets only:
import MaterialConfig from 'react-awesome-query-builder/lib/config/material';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
// For Bootstrap widgets only:

import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles
import '../../assets/css/queryBuilder.css'
import { getQueryBuilderApi } from "store/api/queryBuilder";

// Choose your skin (ant/material/vanilla):
const InitialConfig = MaterialConfig; // or MaterialConfig or BootstrapConfig or BasicConfig


// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { "id": QbUtils.uuid(), "type": "group" };

const QueryBuilder = () => {
 
    const [state, setState] = useState({
        tree: QbUtils.checkTree(QbUtils.loadTree(queryValue),
        {...InitialConfig,
            fields: {}
        }),
        config: {
            ...InitialConfig,
            fields: {}
        }
   })

   useEffect(()=> {
    // getConfig()
       getQueryBuilderApi(response => {
           const resp = JSON.parse(response)
           const { fields } = resp.data
           setState({
               tree: QbUtils.checkTree(QbUtils.loadTree(queryValue),
                   {
                       ...InitialConfig,
                       fields: fields
                   }),
               config: {
                   ...InitialConfig,
                   fields: fields
               }
           })
       });
   },[])

    const renderResult = ({ tree: immutableTree, config }) => (
        <div>
            <div className="query-spacing">
                <GridContainer>
                    <GridItem>
                        <Card className="query-border">
                            <CardBody>
                                Query string: <code>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</code>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            <div className="query-spacing">
                <GridContainer>
                    <GridItem>
                        <Card className="query-border">
                            <CardBody>
                                MongoDb query: <code>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</code>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            <div className="query-spacing">
                <GridContainer>
                    <GridItem>
                        <Card className="query-border">
                            <CardBody>
                                SQL where: <code>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</code>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            <div className="query-spacing">
                <GridContainer>
                    <GridItem>
                        <Card className="query-border">
                            <CardBody>
                                JSON Logic: <code>{JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}</code>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    )

    const renderBuilder = (props) => (
        <div className="query-builder-container" style={{ padding: '10px' }}>
            <div className="query-builder qb-lite">
                <Builder {...props} />
            </div>
        </div>
    )

    const onChange = (immutableTree, config) => {
        // Tip: for better performance you can apply `throttle` - see `examples/demo`
        setState({ tree: immutableTree, config: config });

        const jsonTree = QbUtils.getTree(immutableTree);
        // `jsonTree` can be saved to backend, and later loaded to `queryValue`
    }

    return (
        <div>
            <h3>Query Builder</h3>
            <Query
                {...state.config}
                value={state.tree}
                onChange={onChange}
                renderBuilder={renderBuilder}
            />
            {renderResult(state)}
        </div>
    )
}

export default QueryBuilder
