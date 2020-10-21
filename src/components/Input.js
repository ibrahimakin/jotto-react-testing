import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Input extends Component {
    /*static propTypes = {
        prop: PropTypes
    }*/

    render () {
        return (
            <div>
                <button />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(Input);