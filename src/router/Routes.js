import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Dashboard from "pages/Dashboard/Dashboard.js";
import GridSystem from "pages/Components/GridSystem.js";
import Panels from "pages/Components/Panels.js";
import Search from "pages/Search/Search.js";
import AudienceSettings from "pages/AudienceSettings/AudienceSettings.js";
import Campaigns from "pages/Campaigns/Campaigns.js";

import { ProviderPage } from "../pages/ServiceProviderSettingsPage/ProviderPage";
import { ServiceProviderSettingsPage } from "../pages/ServiceProviderSettingsPage";
import { ServiceSettingsPage } from "pages/ServiceSettingsPage";

import { ServicesPage} from "../pages/ServiceProviderSettingsPage/ServicesPage";
import { ServiceDetailsPage} from "../pages/ServiceProviderSettingsPage/ServicesPage/ServiceDetailsPage";


import { ContactDataPage } from "pages/Settings/ContactDataPage";
import { QueryPage } from "pages/Tool/QueryPage";
import TablePage from "pages/Table/TablePage";


export const Routes = () => {
    return (

        <Switch>
            <Route path="/admin/dashboard" component={Dashboard} />

            <Route path="/admin/search" component={Search} />
            <Route path="/admin/audience-settings" component={AudienceSettings} />
            <Route path="/admin/campaigns" component={Campaigns} />

            <Route path="/admin/visualizer" component={GridSystem} />
            <Route path="/admin/sequences" component={Panels} />

            <Route path="/admin/phone-numbers" component={GridSystem} />
            <Route path="/admin/workflowt-templates" component={Panels} />
            <Route path="/admin/media" component={GridSystem} />


            
            <Route path="/admin/providers/:providerId/services/:serviceId/connection" component={ServiceDetailsPage} />
            <Route path="/admin/providers/:providerId/services" component={ServicesPage} />
            
            <Route path="/admin/providers/:providerId" component={ProviderPage} />
            <Route path="/admin/providers" component={ServiceProviderSettingsPage} />
            <Route path="/admin/service-settings" component={ServiceSettingsPage} />


            

            

            <Route path="/admin/contact-data-provider-settings" component={GridSystem} />

            <Route path="/admin/contact-details" component={ContactDataPage} />

            <Route path="/admin/company-details" component={GridSystem} />
            <Route path="/admin/user-groups" component={GridSystem} />
            <Route path="/admin/user" component={Panels} />
            <Route path="/admin/payments" component={GridSystem} />
            <Route path="/admin/table" component={GridSystem} />

            <Route path="/admin/query-tool" component={QueryPage} />
            <Route path="/admin/table-data" component={TablePage} />
            <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
    );
};