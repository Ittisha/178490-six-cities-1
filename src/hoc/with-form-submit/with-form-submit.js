import * as React from 'react';
import {EMAIL_REG_EXP} from '../../consts';

const withFormSubmit = (Component) => {
  class WithFormSubmit extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        disabled: true,
        dataToSend: {},
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleFormChange = this._handleFormChange.bind(this);
      this._handleFormBlur = this._handleFormBlur.bind(this);
    }

    render() {
      const {disabled, dataToSend} = this.state;

      return (
        <Component
          {...this.props}
          disabled={disabled}
          formData={dataToSend}
          onSubmit={this._handleFormSubmit}
          onChange={this._handleFormChange}
          onBlur={this._handleFormBlur}
        />
      );
    }

    _handleFormSubmit() {
      this.setState({
        disabled: true,
        dataToSend: {},
      });
    }

    _handleFormBlur(evt) {
      evt.persist();

      let disabled = !evt.target.form.checkValidity();
      if (this.state.dataToSend.hasOwnProperty(`email`) && !disabled) {
        disabled = !this.state.dataToSend.email.match(EMAIL_REG_EXP);
      }
      this.setState((prevState) => {
        return {
          disabled,
          dataToSend: Object.assign({}, prevState.dataToSend, {
            [evt.target.name]: evt.target.value,
          })
        };
      });
    }

    _handleFormChange(evt) {
      evt.persist();

      let disabled = !evt.target.form.checkValidity();
      if (this.state.dataToSend.hasOwnProperty(`email`) && !disabled) {
        disabled = !this.state.dataToSend.email.match(EMAIL_REG_EXP);
      }
      this.setState((prevState) => {
        return {
          disabled,
          dataToSend: Object.assign({}, prevState.dataToSend, {
            [evt.target.name]: evt.target.value,
          })
        };
      });
    }
  }

  return WithFormSubmit;
};

export {withFormSubmit};
