import * as React from 'react';

export const withToggleSorting = (Component) => {
  return class WithToggledSorting extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpened: false,
      };

      this._handleToggleSorting = this._handleToggleSorting.bind(this);
    }

    render() {
      const {isOpened} = this.state;

      return <Component
        {...this.props}
        isOpened={isOpened}
        onSortingToggle={this._handleToggleSorting}
      />;
    }

    _handleToggleSorting() {
      this.setState((state) => ({
        isOpened: !state.isOpened,
      }));
    }
  };
};
