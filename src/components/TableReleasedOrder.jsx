import { Space, Table, Modal, Tag, Avatar, Button, message, Typography } from "antd";
import { useState, useEffect } from "react";
import FormConfirmExport from "./FormConfirmExport";
import { getReleasedOrder } from "../Service";
import { InsertRowBelowOutlined } from "@ant-design/icons";
const { Text } = Typography;

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "ORDERCODE",
    width: "10%",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Người gửi",
    dataIndex: "SENDERINFO_",
    width: "10%",
    render: (text, record) => (
      <Space direction="vertical">
        <Text>{record.SENDERNAME}</Text>
        <Text type="secondary">{record.SENDERPHONE}</Text>
      </Space>
    ),
  },
  {
    title: "Địa chỉ gửi",
    dataIndex: "SENDERADDRESS",
    width: "15%",
  },
  {
    title: "Người nhận",
    dataIndex: "RECEIVERINFO_",
    width: "10%",
    render: (text, record) => (
      <Space direction="vertical">
        <Text>{record.RECEIVERNAME}</Text>
        <Text type="secondary">{record.RECEIVERPHONE}</Text>
      </Space>
    ),
  },
  {
    title: "Địa chỉ nhận",
    dataIndex: "RECEIVERADDRESS",
    width: "15%",
  },
  {
    title: "Khối lượng",
    dataIndex: "WEIGHT",
    align: "center",
    width: "auto",
  },
  {
    title: "COD",
    dataIndex: "COD",
    align: "center",
    width: "auto",
  },
  {
    title: "Trạng thái",
    dataIndex: "DELIVERYSTATUS",
    width: "auto",
    render: (text) => (text == "RELEASED" ? <Tag color={"green"}>Đã phát hành</Tag> : ""),
  },
  // {
  //     title:'Action',
  //     dataIndex: 'action',
  //     width: 'auto',
  //     render:(text) => (
  //         <Tag color = {'green'}>

  //         </Tag>
  //     )
  // },
];
const defaultExpandable = {
  expandedRowRender: (record) => (
    <Space direction="horizonal" size="middle" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}></Space>
  ),
};
const TableReleasedOrder = () => {
  const [data, setData] = useState([]);
  const [hasData, setHasData] = useState(true);
  const [SelectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const successMessage = () => {
  //     message.success("Nhập kho thành công")
  // }
  // const failMessage = () => {
  //     message.error("Nhập kho thất bại")
  // }

  async function getReleasedData() {
    var res = await getReleasedOrder();
    if (res !== null) {
      let _res = res.RESPONSES.map((x) => ({ ...x, key: x.ID }));
      setData(_res);
    }
  }
  useEffect(() => {
    getReleasedData();
  }, []);

  const resetData = () => {
    setData(data.filter((x) => !SelectedData.includes(x.ID)));
  };

  const defaultTitle = () => (
    <Space
      direction="horizonal"
      style={{ display: "flex", justifyContent: "space-between", padding: ".8rem", fontWeight: "bold" }}
    >
      <Avatar shape="square" size={40} icon={<InsertRowBelowOutlined />} />
      <Space>
        <Button onClick={ShowConfirmExport} hidden={!SelectedData.length} type="primary">
          Điều chuyển
        </Button>
        <Button hidden={!SelectedData.length} type="primary">
          Giao nhận
        </Button>
      </Space>
    </Space>
  );
  const HandleSetSelectedData = (e) => {
    setSelectedData(e);
  };
  const tableColumns = columns.map((item) => ({ ...item, ellipsis: true }));
  const tableProps = {
    bordered: true,
    loading,
    size: "middle",
    expandable: defaultExpandable,
    title: defaultTitle,
    showHeader: true,
    rowSelection: {
      selectedRowKeys: SelectedData,
      onChange: (e) => HandleSetSelectedData(e),
    },
    tableLayout: "unset",
  };
  const [IsConfirmExportShow, setIsConfirmExportShow] = useState(false);

  const ShowConfirmExport = () => {
    setIsConfirmExportShow(true);
  };
  const HandleClose = () => {
    setSelectedData([]);
    setIsConfirmExportShow(false);
  };
  const HandleClose1 = () => {
    setIsConfirmExportShow(false);
  };
  const getSelectedData = () => {
    var dataSelected = data.filter((x) => SelectedData.includes(x.ID));
    return dataSelected;
  };

  const deleteData = (item) => {
    let newData = [...SelectedData];
    let index = SelectedData.indexOf(item.ID);
    if (index !== -1) {
      newData.splice(index, 1);
      setSelectedData(newData);
    }
  };

  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: ["bottomRight"],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={{ y: 700 }}
      />
      <Modal title="Phiếu xuất kho" width="80%" visible={IsConfirmExportShow} onCancel={HandleClose1} footer={null}>
        <FormConfirmExport
          onCancel={HandleClose}
          getSelectedData={getSelectedData}
          deleteData={deleteData}
          resetData={resetData}
        />
      </Modal>
    </>
  );
};
export default TableReleasedOrder;
