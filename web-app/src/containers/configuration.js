import './styles/configuration.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateReportConfig} from '../server-client/actions';
import {updateConfig} from '../reducers/action.creators';
import {Button} from '../elements/button';
import ReactJSON from 'react-json-view';
import lStorage from '../utils/local.storage';
import {withTranslation} from 'react-i18next';

const defaultConfig = {
  testCaseStructure: {},
  serverHost: null,
  failedReasons: []
}

class ReportConfig extends Component {

  state = {}

  componentDidMount() {
    const existingConfig = lStorage.lsGet('config')
    if(existingConfig && Object.keys(existingConfig).length) {
      this.setState({...this.state, ...existingConfig})
    }
  }

  updateConfig = (data) => {
    this.setState({...this.state, ...data.updated_src})
    lStorage.lsSet('config', data.updated_src)
  }

  updateServerHost = ({target: {value}}) => {
    this.setState({...this.state, serverHost: value})
  }

  syncConfig = () => {
    const {dispatch} = this.props;
    lStorage.lsSet('config', JSON.stringify(this.state))
    dispatch(updateConfig(this.state))
    return updateReportConfig({config: this.state})
  }

  showExample = () => {
    this.setState({...this.state, showExample: !this.state.showExample})
  }

  render() {
    let lStorageConfig = lStorage.lsGet('config')

    if(!lStorageConfig) {
      console.error('config was not found in local storage')
      lStorageConfig = defaultConfig
    }

    return (
      <div className="configuration">
        <Button onClick={this.syncConfig} title={'Sync config'} />
        <div className="configuration_editor">
          <ReactJSON src={lStorageConfig}
            onEdit={this.updateConfig}
            onDelete={this.updateConfig}
            onAdd={this.updateConfig}
          />
        </div>
      </div>
    )
  }
}

export default connect(({config}) => ({config}))(withTranslation()(ReportConfig))
