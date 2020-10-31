import './styles/header.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InformationMessage, Button} from '../elements';
import {DropList} from '../components/drop.list';
import {getTestCases, getRunsStatistics, getProjects} from '../server-client/actions';
import {updateCasesList, updateRunStatistics} from '../reducers/action.creators';
import {dataFormatter} from '../utils';
import lsStore from '../utils/local.storage'
import {withTranslation} from 'react-i18next';

class Header extends Component {

  state = {
    fromDateOpen: false,
    toDateOpen: false,
    autosync: false,
    messages: []
  }


  componentDidMount() {
    dataFormatter.pubSubSubscribe('buildInfo_warning', (ms, data) => {
      console.warn(ms)
      this.setState({
        ...this.state,
        messages: [...this.state.messages, data]
      })
    })
    getProjects((projects) => this.setState({...this.state, projects}));
  }

  changeLocation = (lang) => {
    const {i18n} = this.props;
    i18n.changeLanguage(lang);
    lsStore.lsSet('lang', lang);
  }

  renderMessages = () => {
    const {messages} = this.state
    return messages.map((messageInfo, index) => {
      const removeMessage = () => {
        const newState = {...this.state}
        newState.messages.splice(index, 1)
        this.setState({...newState})
      }

      return (
        <InformationMessage
          {...messageInfo}
          key={index}
          onClick={removeMessage}
        />
      )
    })
  }

  getTestCaseByTime = (hours) => {
    const {dispatch, endDate} = this.props
    const dateRange = {startDate: Date.now() - (3600000 * hours), endDate}
    return getTestCases((casesFromBackend) => {
      const cases = casesFromBackend.filter(function({date}) {
        return dateRange.startDate <= date && date <= dateRange.endDate
      })
      dispatch(updateCasesList(cases))
    })
  }

  enableAutoSync = () => {
    if(this.state.autosync) {
      clearInterval(this.state.autosync)
      this.setState({...this.state, autosync: false})
    } else {
      const autosync = setInterval(this.resyncCases, 5000)
      this.setState({...this.state, autosync})
    }
  }

  resyncCases = () => {
    const {dispatch} = this.props
    return getTestCases((cases) => dispatch(updateCasesList(cases)))
      .then(getRunsStatistics)
      .then((runs) => dispatch(updateRunStatistics(runs)))
  }

  filterTestCasesByDay = (name, dateObj) => {

    const dateObjNumber = +dateObj
    const {dispatch, startDate, endDate} = this.props
    const dateRange = {startDate, endDate}

    return getTestCases((casesFromBackend) => {

      if(startDate <= dateObjNumber && dateObjNumber <= endDate) {
        dateRange[name] = dateObjNumber
        const cases = casesFromBackend.filter(function({date}) {
          return dateRange.startDate <= date && date <= dateRange.endDate
        })
        dispatch(updateCasesList(cases))
      } else {
        console.log('Date range is out of')
      }
    })
  }

  render() {
    const {t, cases = []} = this.props
    const {autosync} = this.state

    // TODO this approach will be updated
    // if(cases.length) {
    //   startDate = startDate ? startDate : cases[0].date
    //   endDate = endDate ? endDate : cases[cases.length - 1].date
    // }

    return (
      <nav className='header'>
        {this.renderMessages()}

        <div className='header_information'>
          <h4>{t('testcase.quantity')} :  <span className='test_case_count'>{cases.length}</span></h4>
        </div>

        <div className='header_actions'>
          <DropList
            className={'circle_white'}
            buttonClassName={'circle_white'}
            title={t('language.lang')}
          >
            <div>
              <Button title={t('language.en')} onClick={() => this.changeLocation('en')} />
            </div>
            <div>
              <Button title={t('language.ru')} onClick={() => this.changeLocation('ru')} />
            </div>
          </DropList>

          <DropList
            className={'drop_range circle_white'}
            buttonClassName={'circle_white'}
            title={t('time.time')}
            items={[
              {name: t('time.halfAnHour'), click: () => this.getTestCaseByTime(0.5)},
              {name: t('time.oneHour'), click: () => this.getTestCaseByTime(1)},
              {name: t('time.twoHours'), click: () => this.getTestCaseByTime(2)},
              {name: t('time.threeHours'), click: () => this.getTestCaseByTime(3)},
              {name: t('time.fourHours'), click: () => this.getTestCaseByTime(4)},
              {name: t('time.oneDay'), click: () => this.getTestCaseByTime(24)},
              {name: t('time.twoDays'), click: () => this.getTestCaseByTime(48)},
              {name: t('time.threeDays'), click: () => this.getTestCaseByTime(72)},
            ]}
          >
            <Button title={'Resync cases'} onClick={this.resyncCases} />
            <Button
              title={!autosync ? 'Enable autosync' : 'Disable autosync'}
              className={autosync ? 'active' : ''}
              onClick={this.enableAutoSync}
            />
          </DropList>
        </div>
        <div>
        </div>
      </nav>
    )
  }
}

export default connect(({cases}) => ({...cases}))(withTranslation()(Header))

