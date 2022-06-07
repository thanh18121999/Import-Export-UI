import { Tabs } from 'antd';
import { useState } from 'react';
import TableInWarehouse from './components/TableInWarehouse';
import TableWaitingForImport from './components/TableWaitingForImport';
import TableWaitingForExport from './components/TableWaitingForExport';

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
      </Tabs>
    </>
  );
};

export default ManageWarehouseImportExportOrder;
