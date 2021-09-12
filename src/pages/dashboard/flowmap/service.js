import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function fakeServiceData() {
  return request('/api/fake_service_flowin_top_data');
}
