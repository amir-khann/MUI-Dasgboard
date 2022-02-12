import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProviderPageComponent from './ProviderPage.js';

export const ProviderPage =
    connect(
        (state) => ({
            state: state,
        }),
        (dispatch) => ({
            actions: bindActionCreators({
            }, dispatch)
        })
    )(ProviderPageComponent);