import './styles/navigation.menu.scss';

import React, {Component} from 'react';
import {Button} from '../components/button';
import {locationStorage} from '../utils';
import {Trans, withTranslation, useTranslation} from 'react-i18next';

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
    return (
      <div className="navigation-menu-internal-content">
        <Button title={'Hide'}/>
        {this.renderMenu()}
      </div>
    )
  }
}

export default withTranslation()(NavigationMenu)
