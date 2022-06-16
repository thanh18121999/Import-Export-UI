import { Tabs } from "antd";
import TableReleasedOrder from "./components/TableReleasedOrder.jsx";
// import TableWaitingForExport from "./components/TableWaitingForExport.jsx";
import TableWaitingForImport from "./components/TableWaitingForImport.jsx";

const { TabPane } = Tabs;
const ManageWarehouseImportExportOrder = () => {
  return (
    <>
      <Tabs tabPosition="left">
        <TabPane tab="Nhập kho" key="0">
          <TableWaitingForImport />
        </TabPane>
        <TabPane tab="Xuất kho" key="1">
          <TableReleasedOrder />
        </TabPane>
        {/* <TabPane tab="Chờ xuất kho" key="2">
          <TableWaitingForExport />
        </TabPane> */}
      </Tabs>
    </>
  );
};

export default ManageWarehouseImportExportOrder;
