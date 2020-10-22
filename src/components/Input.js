import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { guessWord } from '../actions';

export class UnconnectedInput extends Component {
    /*static propTypes = {
        prop: PropTypes
    }*/

    render () {
        const contents = this.props.success
            ? null
            : (
                <form className="form-inline" >
                    <input
                        data-test="input-box"
                        className="mb-2 mx-sm-3"
                        type="text"
                        placeholder="enter guess" />
                    <button
                        onClick={() => this.props.guessWord('train')}
                        data-test="submit-button"
                        type="submit"
                        className="btn btn-primary mb-2">Submit</button>
                </form>
            );
        return (
            <div data-test="component-input" >
                {contents}
            </div>
        );
    }
}

const mapStateToProps = ({ success }) => {
    return { success };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);