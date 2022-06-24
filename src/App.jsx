import { Tabs } from "antd";
import PickedUpOrder from "./components/DonDaThuGom/PickedUpOrder.jsx";
import TableReleasedOrder from "./components/TableReleasedOrder.jsx";
// import TableWaitingForExport from "./components/TableWaitingForExport.jsx";
import TableWaitingForImport from "./components/TableWaitingForImport.jsx";

const { TabPane } = Tabs;
const ManageWarehouseImportExportOrder = () => {
  return (
    <>
      <Tabs tabPosition="left">
        <TabPane tab="Nhập kho" key="0">
          <Tabs tabPosition="top">
            <TabPane tab="Đơn điều chuyển" key="0">
              <TableWaitingForImport />
            </TabPane>

            <TabPane tab="Đơn đã thu gom" key="1">
              <PickedUpOrder />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Xuất kho" key="1">
          <TableReleasedOrder />
        </TabPane>
      </Tabs>
    </>
  );
};

export default ManageWarehouseImportExportOrder;
