import * as React from 'react';
import {EMAIL_REG_EXP} from '../../consts';

export const withFormSubmit = (Component) => {
  class WithFormSubmit extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        disabled: true,
        dataToSend: {},
      };

      this._onSubmit = this._onSubmit.bind(this);
      this._onChange = this._onChange.bind(this);
    }

    render() {
      const {disabled, dataToSend} = this.state;

      return (
        <Component
          {...this.props}
          disabled={disabled}
          formData={dataToSend}
          onSubmit={this._onSubmit}
          onChange={this._onChange}
        />
      );
    }

    _onSubmit() {
      this.setState({
        disabled: true,
        dataToSend: {},
      });
    }

    _onChange(evt) {
      evt.persist();

      let disabled = !evt.target.form.checkValidity();
      if (evt.target.name === `email` && !disabled) {
        disabled = !evt.target.value.match(EMAIL_REG_EXP);
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
