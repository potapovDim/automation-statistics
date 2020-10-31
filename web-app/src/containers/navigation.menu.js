import './styles/navigation.menu.scss';

import React, {Component} from 'react';
import {Button} from '../base/button';
import {locationStorage} from '../utils';
import {withTranslation} from 'react-i18next';

class NavigationMenu extends Component {

  renderMenu = () => {
    const {t} = this.props;
    const currentView = locationStorage.getLocationHash();
    const {toggleContent, navidationButtons} = this.props;
    return navidationButtons.map((toggler, index) => {
      return (
        <div key={index}>
          <Button
            className={currentView === toggler ? 'active' : ''}
            onClick={() => toggleContent(toggler)}
            title={t(`menu.${toggler}`)}
          />
        </div>
      );
    })
  }

  render() {
    const {t} = this.props;
    return (
      <div className="navigation-menu-internal-content">
        <Button title={t('components.hide')} />
        {this.renderMenu()}
      </div>
    )
  }
}

export default withTranslation()(NavigationMenu)
