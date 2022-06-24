import React, { useContext, useEffect, useState } from "react";

import { Table, Switch, Space, Select, Button, DatePicker, Typography, Tag, message } from "antd";

import moment from "moment";
import { getPickedUpOrder, postOrderList } from "../../Service";
import { CarOutlined, FileDoneOutlined, ReloadOutlined } from "@ant-design/icons";
// import { GetQueryShipmentApi, PostDataAPI } from "../../utils/Service";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const columns = [
  {
    title: "Mã Đơn Hàng",
    dataIndex: "ORDERCODE",
    // width: "70px",
    align: "center",
  },
  {
    title: "Người gửi",
    width: "12%",
    align: "center",
    render: (text, record) => (
      <>
        <p style={{ margin: 0, fontSize: "15px" }}>{record.SENDERNAME}</p>
        <Text style={{ fontSize: "12px" }} disabled>
          {record.SENDERPHONE}
        </Text>
      </>
    ),
  },
  {
    title: "Địa Chỉ",
    dataIndex: "SENDERADDRESS",
    width: "15%",
    align: "center",
  },
  {
    title: "Người Nhận",
    align: "center",
    render: (text, record) => (
      <>
        <p style={{ margin: 0, fontSize: "15px" }}>{record.RECEIVERNAME}</p>
        <Text style={{ fontSize: "12px" }} disabled>
          {record.RECEIVERPHONE}
        </Text>
      </>
    ),
    width: "12%",
  },
  {
    title: "Địa Chỉ",
    dataIndex: "RECEIVERADDRESS",
    width: "15%",
    align: "center",
  },
  {
    title: "Thời Gian Lập",
    // width: "10%",
    align: "center",
    render: (text, record) => {
      const day = text.TIMEREGISTER?.split(" ") || "";
      return (
        <>
          <p style={{ margin: 0, fontSize: "15px" }}>{day[0]}</p>
          <Text style={{ fontSize: "12px" }} disabled>
            {day[1] + day[2]}
          </Text>
        </>
      );
    },
  },
  {
    title: "Thu Hộ",
    dataIndex: "COD",
    // width: "10%",
    align: "center",
    // key: "currebcy",
  },
  {
    title: "Tổng Cước",
    dataIndex: "TOTALPOSTAGE",
    align: "center",
    // width: "10%",
  },
];

// rowSelection objects indicates the need for row selection

function PickedUpOrder(props) {
  const [loading, setLoading] = useState(false);
  const [rowItem, setRowItem] = useState([]);
  const [dataList, setDataList] = useState([]);
  let prev15now = new Date(Date.now() - 1296000000);
  let now = new Date(Date.now());
  const [date, setDate] = useState({
    startDate: prev15now.getFullYear() + "-" + (prev15now.getMonth() + 1) + "-" + prev15now.getDate(),
    endDate: now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
  });
  const OnSelectDateChange = (e) => {
    if (e)
      setDate((prevState) => ({
        ...prevState,
        startDate: e[0].format("YYYY-MM-DD"),
        endDate: e[1].format("YYYY-MM-DD"),
      }));
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowItem(selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      setRowItem(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setRowItem(selectedRows);
    },
  };

  const data = dataList;
  const isLoadingTrue = () => {
    setLoading(true);
  };
  const isLoadingFail = () => {
    setLoading(false);
  };
  async function fetchPickupSuccessList() {
    isLoadingTrue();
    let res = await getPickedUpOrder(isLoadingFail);
    console.log(res);
    // setDataList(res);
    if (res) {
      isLoadingFail();
      setDataList(res);
    }
  }
  const reloadData = () => {
    fetchPickupSuccessList();
  };
  useEffect(() => {
    fetchPickupSuccessList();
  }, []);
  const successFun = () => message.success("Nhập kho thành công");
  const errorFun = (val) => message.error(val);
  async function pushData() {
    await postOrderList(rowItem, successFun, errorFun, reloadData);
    // console.log(res, "Message");
  }

  const defaultTitle = () => (
    <Space direction="horizonal" style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: "1.2rem" }}>
        <CarOutlined style={{ fontSize: "2rem", color: "#8c8c8c" }} />
        <h3 style={{ lineHeight: 2, color: "#8c8c8c" }}>Danh sách chuyến giao</h3>
      </div>
      <Space>
        <RangePicker
          name="RangeDate"
          defaultValue={[moment(`${date.startDate}`, "YYYY-MM-DD"), moment(`${date.endDate}`, "YYYY-MM-DD")]}
          onChange={OnSelectDateChange}
        />
        <Button icon={<ReloadOutlined />} onClick={reloadData} type="primary">
          Tải lại
        </Button>
        <Button disabled={rowItem.length ? false : true} icon={<FileDoneOutlined />} onClick={pushData} type="primary">
          Nhập kho
        </Button>
      </Space>
    </Space>
  );

  const tableProps = {
    bordered: true,
    loading,
    size: "middle",
    title: defaultTitle,
    showHeader: true,
    // rowSelection: {
    //   onChange: (e) => HandleSetSelectedData(e),
    // },
    tableLayout: "unset",
  };
  return (
    <div className="tableCustom">
      <Table
        scroll={{ y: "75vh" }}
        {...tableProps}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
      />
    </div>
  );
}

export default PickedUpOrder;
