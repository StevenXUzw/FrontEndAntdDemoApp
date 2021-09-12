import { Card, Col, Row, Statistic} from 'antd';
import { Suspense, useState } from 'react';
import { useRequest } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';
import Map from './components/Map';
import Clock from './components/Clock';
import ActiveChart from './components/ActiveChart';
import UrlsCard from './components/UrlsCard';
import { fakeChartData } from './service';
import { fakeServiceData } from './service';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';

const FlowMap = () => {
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('year'));
  const { loading, data } = useRequest(fakeChartData);

  const selectDate = (type) => {
    setRangePickerValue(getTimeDistance(type));
  };

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value);
  };

  const isActive = (type) => {
    if (!rangePickerValue) {
      return '';
    }

    const value = getTimeDistance(type);

    if (!value) {
      return '';
    }

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }

    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }

    return '';
  };

  return (
    <GridContent>
      <>
      <Row gutter={24}>
        <Col
          xl={18}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card title="实时流量" bordered={false}>
            <Row>
              <Col md={6} sm={12} xs={24}>
                <Statistic
                  title="今日UV"
                  suffix="人"
                  value={numeral(1243233).format('0,0')}
                />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Statistic
                    title="网关请求次数"
                    suffix="次"
                    value={numeral(14243231).format('0,0')}
                  />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Clock />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Statistic title="每秒请求次数" suffix="元" value={numeral(3234).format('0,0')} />
              </Col>
            </Row>
            <div className={styles.mapChart}>
              <Map />
            </div>
          </Card>
        </Col>
        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="活动情况预测"
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            <ActiveChart />
          </Card>
        </Col>
      </Row>
      <Suspense fallback={null}>
        <UrlsCard
          rangePickerValue={rangePickerValue}
          salesData={data?.salesData || []}
          servicesData={data?.servicesData || []}
          isActive={isActive}
          handleRangePickerChange={handleRangePickerChange}
          loading={loading}
          selectDate={selectDate}
        />
      </Suspense>
      </>
    </GridContent>
  )

}
export default FlowMap;
