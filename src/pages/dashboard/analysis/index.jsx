import { Suspense, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import SalesCard from './components/SalesCard';
import { useRequest } from 'umi';
import { fakeChartData } from './service';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';

const Analysis = () => {
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
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={data?.salesData || []}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense>
      </>
    </GridContent>
  );
};

export default Analysis;
