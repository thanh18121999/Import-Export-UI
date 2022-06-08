import { Tabs } from 'antd';
import { useState } from 'react';
import TableInWarehouse from './components/TableInWarehouse.jsx';
import TableWaitingForImport from './components/TableWaitingForImport.jsx';
import TableWaitingForExport from './components/TableWaitingForExport.jsx';
import TableDelivery from './components/TableDelivery.jsx';

const { TabPane } = Tabs;
const ManageWarehouseImportExportOrder = () => {
  
  return (
    <>
      <Tabs tabPosition='left'>
        <TabPane tab="Chờ nhập kho" key="0">
          <TableWaitingForImport />
        </TabPane>
        <TabPane tab="Đang lưu kho" key="1">
          <TableInWarehouse />
        </TabPane>
        <TabPane tab="Chờ xuất kho" key="2">
          <TableWaitingForExport />
        </TabPane>
        <TabPane tab="Báo phát" key="3">
          <TableDelivery />
        </TabPane>
      </Tabs>
    </>
  );
};

export default ManageWarehouseImportExportOrder;
