import * as React from 'react';

export const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };
      this._setActiveItem = this._setActiveItem.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          setActiveItem={this._setActiveItem}
        />);
    }

    _setActiveItem(item) {
      this.setState({activeItem: item});
    }
  }

  return WithActiveItem;
};
