import { Space, Tag, Input, Table, DatePicker, Card, Popconfirm, message, Button } from "antd";

import { useEffect, useState } from "react";
import { postConfirmUpdate } from "../Service";

const FormConfirmTransfer = ({ dataTableConfirm, onCancel, detailList }) => {
  const dateFormat = "DD/MM/YYYY";
  const [orders, setOrders] = useState();
  const [data, setData] = useState(orders);
  const [visible, setVisible] = useState(false);
  // table
  useEffect(() => {
    setOrders(detailList);
    setData(detailList);
    console.log("1");
  }, [detailList]);
  const listOrderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ORDERCODE",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ gửi",
      dataIndex: "SENDERADDRESS",
      width: "20%",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "RECEIVERADDRESS",
      width: "20%",
    },
    {
      title: "Khối lượng",
      dataIndex: "WEIGHT",
      width: "20%",
    },
  ];
  // end table
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, ellipsis: true }));
  const listOrderProps = {
    bordered: true,
    pagination: false,
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
  };

  const showPopconfirm = () => {
    setVisible(true);
  };
  const messageSuccess = () => message.success("Thành công!!");
  const messageError = () => message.error("Error");
  const confirm = (e) => {
    const dataPOST = {
      Id: [dataTableConfirm.ID],
      ActionType: "IMEXPORTLIST_RECEIVER",
      Note: "",
      ActionData: {
        IDSuccess: [],
        IDFail: [],
      },
    };
    console.log(dataPOST);
    postConfirmUpdate(dataPOST, messageSuccess, messageError, onCancel);
    setVisible(false);
  };
  const cancel = (e) => {
    message.error("Error");
    setVisible(false);
    onCancel();
  };

  return (
    <>
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
            {/* <DatePicker
              format={dateFormat}
              placeholder="Ngày tạo"
              //  value={dataTableConfirm.CREATEDDATE}
            /> */}
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
        <Card>
          Danh sách đơn hàng trong phiếu
          <Table {...listOrderProps} columns={listOrderColumn} dataSource={data} scroll={{ y: 700 }}></Table>
        </Card>
      </Space>
      {dataTableConfirm.STATUS === "IMPORTLIST_SUCCESS" ? (
        ""
      ) : (
        <div style={{ textAlign: "end", padding: "20px 0 10px " }}>
          <Popconfirm
            title="Xác nhận phiếu điều chuyển đã tới kho?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Xác nhận"
            cancelText="Hủy"
            visible={visible}
          >
            <Button onClick={showPopconfirm} type="primary">
              Xác nhận tới
            </Button>
          </Popconfirm>
        </div>
      )}
    </>
  );
};

export default FormConfirmTransfer;
