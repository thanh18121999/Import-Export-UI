import { Space, Tag, Input, Table, DatePicker, Badge, Dropdown, Menu, Tabs, Button, message, Popconfirm } from "antd";

import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { postConfirmUpdate } from "../Service";
import { useEffect } from "react";

// const orders = [
//   {
//     key: "123",
//     id: "4fbe3948-d943-45b9-a95b-580c52e54d00",
//     ticketID: "4fbe3948-d943-45b9-a95b-580c52e54d00",
//     shipno: "IUTTGVET1",

//     dropofftype: "1",
//     servicetype: "1",
//     ORDERCODE: "IUTTGVET",
//     shippingchargespayment: "Sender",
//     deliverystatus: "PICKUP_WAITING",
//     timeregister: "5/19/2022 3:45:51 PM",
//     sendername: "Thành vip pro",
//     senderphone: "0123456789",
//     SENDERADDRESS: "thu duc, vn",
//     sendercountrycode: "VN",
//     sendercitycode: "VN-SG",
//     senderdistrictcode: "71010",
//     senderwardcode: "71020",
//     senderpostalcode: "71000",
//     receivername: "test3",
//     receiverphone: "0987654321",
//     RECEIVERADDRESS: "hanoi, vn",
//     receivercountrycode: "VN",
//     receivercitycode: "VN-HN",
//     receiverdistrictcode: "Cầu Giấy",
//     receiverwardcode: "1",
//     receiverpostalcode: "100000",
//     totalpackages: 2,
//     servicepostage: 1,
//     addedpostage: 1,
//     codpostage: 1,
//     surcharge: 1,
//     totalpostage: 1,
//     vat: 1,
//     WEIGHT: 12,
//     cod: 300,
//     currency: "VND",
//     content: null,
//     note: null,
//     warehouse: "WH01",
//   },
//   {
//     key: "1234",
//     id: "47fb9e2a-840f-4444-b730-24ddb31cddca",
//     ticketID: "4fbe3948-d943-45b9-a95b-580c52e54d00",
//     shipno: "EGDUIEEH1",
//     dropofftype: "1",
//     servicetype: "1",
//     ORDERCODE: "EGDUIEEH",
//     shippingchargespayment: "Sender",
//     deliverystatus: "PICKUP_WAITING",
//     timeregister: "5/19/2022 4:15:14 PM",
//     sendername: "Thắng ",
//     senderphone: "0747852369",
//     SENDERADDRESS: "01/01",
//     sendercountrycode: "VN",
//     sendercitycode: "VN-SG",
//     senderdistrictcode: "71010",
//     senderwardcode: "P3",
//     senderpostalcode: "700000",
//     receivername: "Thành ",
//     receiverphone: "0926985147",
//     RECEIVERADDRESS: "02/01",
//     receivercountrycode: "VN",
//     receivercitycode: "VN-HN",
//     receiverdistrictcode: "Cầu Giấy",
//     receiverwardcode: "P3",
//     receiverpostalcode: "100000",
//     totalpackages: 1,
//     servicepostage: 1,
//     addedpostage: 1,
//     codpostage: 1,
//     surcharge: 1,
//     totalpostage: 1,
//     vat: 1,
//     WEIGHT: 65,
//     cod: 10,
//     currency: "VND",
//     content: null,
//     note: null,
//     warehouse: "WH01",
//   },
//   {
//     key: "12345",
//     id: "47fb9e2a-840f-4444-b730-24ddb31cddcx",
//     ticketID: "4fbe3948-d943-45b9-a95b-580c52e54d01",
//     shipno: "EGDUIEEH2",
//     dropofftype: "1",
//     servicetype: "1",
//     ORDERCODE: "EGDUBGEH",
//     shippingchargespayment: "Sender",
//     deliverystatus: "PICKUP_WAITING",
//     timeregister: "5/19/2022 4:15:14 PM",
//     sendername: "Thắng cute ",
//     senderphone: "0747852369",
//     SENDERADDRESS: "Heaven",
//     sendercountrycode: "VN",
//     sendercitycode: "VN-SG",
//     senderdistrictcode: "71010",
//     senderwardcode: "P3",
//     senderpostalcode: "700000",
//     receivername: "Phúc Boiz ",
//     receiverphone: "0926985147",
//     RECEIVERADDRESS: "Hell",
//     receivercountrycode: "VN",
//     receivercitycode: "VN-HN",
//     receiverdistrictcode: "Cầu Giấy",
//     receiverwardcode: "P3",
//     receiverpostalcode: "100000",
//     totalpackages: 1,
//     servicepostage: 1,
//     addedpostage: 1,
//     codpostage: 1,
//     surcharge: 1,
//     totalpostage: 1,
//     vat: 1,
//     WEIGHT: 65,
//     cod: 10,
//     currency: "VND",
//     content: null,
//     note: null,
//     warehouse: "WH01",
//   },
// ];

const FormConfirmImport = ({ dataTableConfirm, onCancel, detailList }) => {
  const [orders, setOrders] = useState();
  const dateFormat = "DD/MM/YYYY";
  const { TabPane } = Tabs;
  const [SelectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(orders);
  const [chosenData, setChosenData] = useState([]);
  const [dropData, setDropData] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [visible, setVisible] = useState(false);

  console.log(data, "dataTable");
  useEffect(() => {
    setOrders(detailList);
    setData(detailList);
    console.log("1");
  }, [detailList]);
  const chooseOrder = (e) => {
    setActiveTab("1");
    const temp = [...data];
    const chosenItem = temp.find((item) => item.ID === e.ID);
    setChosenData([...chosenData, chosenItem]);
    const idx = temp.findIndex((item) => item.ID === e.ID);
    const temp1 = [...data];
    temp1.splice(idx, 1);
    setData(temp1);
  };
  // console.log(chosenData.length);
  const unChooseOrder = (e) => {
    const temp = [...chosenData];
    const chosenItem = temp.find((item) => item.ID === e.ID);
    setData([...data, chosenItem]);
    const idx = temp.findIndex((item) => item.ID === e.ID);
    const temp1 = [...chosenData];
    temp1.splice(idx, 1);
    setChosenData(temp1);
  };
  const dropOrder = (e) => {
    setActiveTab("2");
    const temp = [...data];
    const dropItem = temp.find((item) => item.ID === e.ID);
    setDropData([...dropData, dropItem]);
    const idx = temp.findIndex((item) => item.ID === e.ID);
    const temp1 = [...data];
    temp1.splice(idx, 1);
    setData(temp1);
  };
  const unDropOrder = (e) => {
    const temp = [...dropData];
    const dropItem = temp.find((item) => item.ID === e.ID);
    setData([...data, dropItem]);
    const idx = temp.findIndex((item) => item.ID === e.ID);
    const temp1 = [...dropData];
    temp1.splice(idx, 1);
    setDropData(temp1);
  };

  const messageSuccess = () => message.success("Thêm thành công");
  const messageFail = () => message.error("Thất bại");

  const HandleSetSelectedData = (e) => {
    setSelectedData(e);
  };
  // table
  const menu = (record) => (
    <Menu
      items={[
        {
          key: "one",
          label: <a onClick={() => chooseOrder(record)}>Nhập kho</a>,
        },
        {
          key: "two",
          label: <a onClick={() => dropOrder(record)}>Chênh lệch</a>,
        },
      ]}
    />
  );

  const listOrderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ORDERCODE",
      key: "ORDERCODE",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ gửi",
      dataIndex: "SENDERADDRESS",
      key: "SENDERADDRESS",
      width: "20%",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "RECEIVERADDRESS",
      key: "RECEIVERADDRESS",
      width: "20%",
    },
    {
      title: "Khối lượng",
      dataIndex: "WEIGHT",
      key: "WEIGHT",
      width: "20%",
    },
    {
      key: "action",
      width: "auto",
      render: (text, record) => (
        <Dropdown overlay={menu(record)}>
          <MenuOutlined style={{ color: "blue" }}></MenuOutlined>
        </Dropdown>
      ),
    },
  ];
  const chosenColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ORDERCODE",
      key: "ORDERCODE",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ gửi",
      dataIndex: "SENDERADDRESS",
      key: "SENDERADDRESS",
      width: "20%",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "RECEIVERADDRESS",
      key: "RECEIVERADDRESS",
      width: "20%",
    },
    {
      title: "Khối lượng",
      dataIndex: "WEIGHT",
      key: "WEIGHT",
      width: "20%",
    },
    {
      key: "action",
      width: "auto",
      render: (_, record) => (
        <Tag color={"red"} onClick={() => unChooseOrder(record)}>
          Xóa
        </Tag>
      ),
    },
  ];
  const dropColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ORDERCODE",
      key: "ORDERCODE",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ gửi",
      dataIndex: "SENDERADDRESS",
      key: "SENDERADDRESS",
      width: "20%",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "RECEIVERADDRESS",
      key: "RECEIVERADDRESS",
      width: "20%",
    },
    {
      title: "Khối lượng",
      dataIndex: "WEIGHT",
      key: "WEIGHT",
      width: "20%",
    },
    {
      key: "action",
      width: "auto",
      render: (_, record) => (
        <Tag color={"red"} onClick={() => unDropOrder(record)}>
          Xóa
        </Tag>
      ),
    },
  ];
  // end table
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, ellipsis: true }));
  const chosenColumn = chosenColumns.map((item) => ({ ...item, ellipsis: true }));
  const dropColumn = dropColumns.map((item) => ({ ...item, ellipsis: true }));
  const defaultTitle = () => <p>Danh sách đơn hàng trong kho</p>;

  const listOrderProps = {
    title: defaultTitle,
    bordered: true,
    pagination: false,
    loading,
    size: "middle",
    showHeader: true,
    rowSelection: {
      onChange: (e) => HandleSetSelectedData(e),
    },
    tableLayout: "unset",
  };
  const chosenProps = {
    bordered: true,
    pagination: false,
    loading,
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
  };
  const showPopconfirm = () => {
    setVisible(true);
  };
  const confirm = (e) => {
    let IDSuccess = chosenData.map((item) => item.ID) || [];
    let IDFail = dropData?.map((item) => item.ID) || [];
    const dataPOST = {
      Id: [dataTableConfirm.ID],
      ActionType: "IMEXPORTLIST_FINISHED",
      Note: "",
      ActionData: {
        IDSuccess,
        IDFail,
      },
    };
    console.log(dataPOST);
    postConfirmUpdate(dataPOST, messageSuccess, messageFail, onCancel);
    setVisible(false);
  };
  const cancel = (e) => {
    setVisible(false);
    onCancel();
  };

  return (
    <>
      <div style={{ position: "relative", paddingBottom: "40px " }}>
        <Space
          direction="horizontal"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <Space direction="vertical">
            <Space direction="horizontal">
              <Input name="Name" addonBefore="Mã phiếu " value={dataTableConfirm.CODE} />
              <Input name="Name" addonBefore="Tên phiếu " value={dataTableConfirm.NAME} />
              <DatePicker format={dateFormat} placeholder="Ngày tạo" />
            </Space>
          </Space>
        </Space>
        <Space
          direction="horizontal"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <Space>
            <Table {...listOrderProps} columns={listOrderColumn} dataSource={data} scroll={{ y: 700 }}></Table>
          </Space>
          <Tabs activeKey={activeTab} onChange={(e) => setActiveTab(e)}>
            <TabPane
              tab={
                <Badge style={{ marginTop: "-2px" }} count={chosenData.length} color="cyan">
                  Danh sách được nhận
                </Badge>
              }
              key="1"
            >
              <Table {...chosenProps} columns={chosenColumn} dataSource={chosenData} scroll={{ y: 700 }}></Table>
            </TabPane>
            <TabPane
              tab={
                <Badge style={{ marginTop: "-2px" }} count={dropData.length} color="cyan">
                  Danh sách lỗi
                </Badge>
              }
              key="2"
            >
              <Table {...chosenProps} columns={dropColumn} dataSource={dropData} scroll={{ y: 700 }}></Table>
            </TabPane>
          </Tabs>
        </Space>

        <div style={{ position: "absolute", bottom: "-10px", right: "0%" }}>
          <Popconfirm
            title="Xác nhận phiếu nhập kho được chọn?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Xác nhận"
            cancelText="Hủy"
            visible={visible}
          >
            <Button onClick={showPopconfirm} disabled={data?.length === 0 ? false : true} type="primary">
              Xác nhận nhập kho
            </Button>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default FormConfirmImport;
