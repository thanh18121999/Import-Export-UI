import { Space, Tag, Input, Table, DatePicker, Card, Popconfirm, message, Divider, Tabs, Button, Skeleton } from "antd";

import { useEffect, useState } from "react";
import { postConfirmUpdate } from "../Service";
import "./Style/XacNhanPhieu.css";
const { TabPane } = Tabs;

const FormConfirm = ({ dataTable, onCancel, detailList }) => {
  const dateFormat = "DD/MM/YYYY";
  const [orders, setOrders] = useState();

  const [data, setData] = useState(orders);
  const [visible, setVisible] = useState(false);
  // console.log(dataTable, " component C");
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
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ gửi",
      align: "center",
      dataIndex: "SENDERADDRESS",
      width: "20%",
    },
    {
      title: "Địa chỉ nhận",
      align: "center",
      dataIndex: "RECEIVERADDRESS",
      width: "20%",
    },
    {
      title: "Khối lượng",
      align: "center",
      dataIndex: "WEIGHT",
      width: "20%",
    },
  ];
  const defaultTitle = () => <h4>Danh sách đơn trong phiếu</h4>;
  // end table
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, ellipsis: true }));
  const listOrderProps = {
    bordered: true,
    title: defaultTitle,
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
      Id: dataTable.ID,
      ActionType: "IMEXPORTLIST_CONFIRM",
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
    setVisible(false);
    onCancel();
  };

  return (
    <>
      {/* <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Space direction="vertical">
                          <Space direction="horizontal">
                            <Input name="Name" addonBefore="Mã phiếu " />
                            <Input name="Name" addonBefore="Tên phiếu " />
                            <DatePicker format={dateFormat} placeholder="Ngày tạo" />
                          </Space>
                        </Space>
      </Space> */}
      <Space
        direction="horizontal"
        size="middle"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          alignItems: "flex-start",
        }}
      >
        <Table {...listOrderProps} columns={listOrderColumn} dataSource={data} scroll={{ y: 700 }}></Table>
        <div style={{ width: "100%" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin phiếu" key="1">
              <Card style={{ width: "100%" }}>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input value={dataTable.CODE} name="code" addonBefore="Mã phiếu " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input value={dataTable.NAME} name="Name" addonBefore="Tên phiếu " />
                </div>
                <div style={{ margin: "0 auto", alignItems: "center", textAlign: "center" }}>
                  <div>
                    {/* <div>
                      <iframe
                        src="https://giphy.com/embed/FsV5XLAiKJQB18MXrs"
                        width={100}
                        height={165}
                        frameBorder={0}
                        className="giphy-embed"
                        allowFullScreen
                      />
                      <p>
                        <a href="https://giphy.com/gifs/cat-tata-FsV5XLAiKJQB18MXrs">via GIPHY</a>
                      </p>
                    </div> */}
                    <Skeleton
                      avatar
                      paragraph={{
                        rows: 4,
                      }}
                    />
                  </div>
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </Space>
      <Space
        direction="horizontal"
        size="middle"
        style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "flex-end",
        }}
      >
        <Popconfirm
          title="Xác nhận phiếu nhập kho được chọn?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Xác nhận"
          cancelText="Hủy"
          visible={visible}
        >
          <Button onClick={showPopconfirm} type="primary">
            Xác nhận phiếu
          </Button>
        </Popconfirm>
      </Space>
    </>
  );
};

export default FormConfirm;
