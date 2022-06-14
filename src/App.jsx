import { Tabs } from 'antd';
import { useState } from 'react';
import TableReleasedOrder from './components/TableReleasedOrder.jsx';
import TableWaitingForImport from './components/TableWaitingForImport.jsx';
import TableWaitingForExport from './components/TableWaitingForExport.jsx';
import TableDelivery from './components/TableDelivery.jsx';
import App from './components/Test.jsx';

const { TabPane } = Tabs;
const ManageWarehouseImportExportOrder = () => {
  
  return (
    <>
      <Tabs tabPosition='left'>
        <TabPane tab="Chờ nhập kho" key="0">
          <TableWaitingForImport />
        </TabPane>
        <TabPane tab="Đã phát hành" key="1">
          <TableReleasedOrder />
        </TabPane>
        <TabPane tab="Chờ xuất kho" key="2">
          <TableWaitingForExport />
        </TabPane>
        <TabPane tab="Báo phát" key="3">
          <TableDelivery />
        </TabPane>
        <TabPane tab="Báo phát" key="4">
          <App />
        </TabPane>
      </Tabs>
    </>
  );
};

export default ManageWarehouseImportExportOrder;
