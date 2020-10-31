import './styles/run.statistics.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BuildItem} from '../components';
import {commonsUtils, dataFormatter} from '../utils';
import {withTranslation} from 'react-i18next';

class RunStatistics extends Component {
  getBuildResult = (runStat) => {
    const {config: {isSuccess = 0} = {}} = this.props
    return isSuccess === runStat
  }

  renderEmptyStatistics = () => {
    const {t} = this.props;
    return (
      <div>
        <h4>{t('RunStatistics.message')}</h4>
      </div>
    )
  }

  renderStatisticsByBuild = (testCases, runStatistics) => {
    const {t} = this.props;
    testCases = testCases.filter(commonsUtils.filterFromUndefinedOrNull)
    runStatistics = runStatistics.filter(commonsUtils.filterFromUndefinedOrNull)

    const {
      buildsCount,
      allBuildsFails,
      averageAmount,
      totalExecutedCases,
      ...buildsStatistics
    } = dataFormatter.getRangeFailedByBuild(testCases, runStatistics)
    const persentage = (allBuildsFails / (totalExecutedCases / 100)).toFixed(2);
    const isStatisticsAvaliable = !!allBuildsFails && !!totalExecutedCases
    return (
      <div className="runs_statistics">
        <div className="count">{t('RunStatistics.count')}: {buildsCount}</div>
        <div>
          {
            isStatisticsAvaliable &&
            <div>
              <div className="total">{t('RunStatistics.totalCount')}: {allBuildsFails}</div>
              <div className="total_executed_cases">{t('RunStatistics.totalExecutedCases')}: {totalExecutedCases} </div>
              <div className="fail_persentage">{t('RunStatistics.averageFailPersentage')}: {persentage} %</div>
              <div className="average_amount">{t('RunStatistics.averageFailedAmount')}: {averageAmount}</div>
            </div>
          }
        </div>
        {
          Object.keys(buildsStatistics).map((runNumber, index) =>
            <BuildItem {...buildsStatistics[runNumber]} key={index} isSuccess={this.getBuildResult} />
          )
        }
      </div>
    )
  }

  render() {
    const {cases = [], runStatistics = []} = this.props
    return (
      <div>
        {cases.length ? this.renderStatisticsByBuild(cases, runStatistics) : this.renderEmptyStatistics()}
      </div>
    )
  }
}


export default connect(({cases}) => cases)(withTranslation()(RunStatistics))
