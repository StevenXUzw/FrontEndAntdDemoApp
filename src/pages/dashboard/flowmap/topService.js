const getFakeData = {
    "servicesData":[
        {
            title: `gateway-service`,
            total: 23234,
        },
        {
            title: `mobileGateway-service`,
            total: 23234,
        },
        {
            title: `order-service`,
            total: 23234,
        },
        {
            title: `payment-service`,
            total: 23234,
        },
        {
            title: `user-service`,
            total: 23234,
        },
        {
            title: `admin-service`,
            total: 23234,
        },
        {
            title: `sys-service`,
            total: 23234,
        },
    ],
  };
const fakeServiceData = (_, res) => {
    return res.json({
        data: {getFakeData},
    });
};
  
export default {
    'GET  /api/fake_service_flowin_top_data': fakeServiceData,
};