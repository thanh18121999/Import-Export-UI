import { Space, Modal, Table, Tag, Select, DatePicker, Button, Row, Col, Typography } from "antd";

import { useState, useEffect } from "react";
import FormConfirm from "./XacNhanPhieu";
import FormConfirmTransfer from "./XacNhanToi";
import FormConfirmImport from "./XacNhanNhapKho";
import moment from "moment";
import { getDetailImExport, getImportList } from "../Service";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
const { Text } = Typography;

const TableWaitingForImport = () => {
  const [importLists, setImportLists] = useState([]);
  const [selectStatus, setSelectStatus] = useState("ALL");
  const [SelectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(true);
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [isLoading, setIsLoading] = useState(false);
  const [dataRenderTable, setDataRenderTable] = useState();
  const [detailList, setDetailList] = useState([]);

  //ApiDetail
  const getDetailImExportAPI = async (record) => {
    let ID = record.ID;
    const res = await getDetailImExport({ ID });
    setDetailList(res);
    console.log(res, "ress");
  };
  // console.log(detailList, " detal chinhs");
  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "CODE",
      width: "10%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên phiếu",
      dataIndex: "NAME",
      width: "auto",
    },
    {
      title: "Mô tả",
      dataIndex: "DESCRIPTION",
      width: "auto",
    },
    {
      title: "Ngày tạo",
      dataIndex: "CREATEDDATE",
      width: "auto",
      render: (text, record) => (
        <Row>
          <Col span={24}>{record.CREATEDDATE.toString().split("T")[0]}</Col>
          <Col span={24}>
            <Text disabled>{record.CREATEDDATE.toString().split("T")[1]}</Text>
          </Col>
        </Row>
      ),
    },
    // {
    //   title: "Người tạo",
    //   dataIndex: "CREATEDUSER",
    //   width: "auto",
    // },
    {
      title: "Kho",
      dataIndex: "EXPORT_FROM",
      width: "auto",
    },
    {
      title: "Trạng thái",
      dataIndex: "STATUS",
      width: "auto",
    },
    {
      title: "Xem thêm",
      key: "action",
      width: "auto",
      render: (_, record) => (
        <Tag
          color={"green"}
          onClick={() => {
            setDataRenderTable(record);

            if (record.STATUS === "EXPORT_DRAFT") {
              getDetailImExportAPI(record);
              ShowConfirmForm();
            } else if (record.STATUS === "IMPORTLIST_WAITING") {
              getDetailImExportAPI(record);
              ShowConfirmImportForm();
            } else {
              getDetailImExportAPI(record);
              ShowConfirmTransferForm();
            }
          }}
        >
          Chi tiết
        </Tag>
      ),
    },
  ];

  //ngày thánh năm
  console.log(dataRenderTable, "TWFI");
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
  const loadingStateTrue = () => {
    setLoading(true);
  };
  const loadingStateFail = () => {
    setLoading(false);
  };

  async function getImportLists(loadingFail) {
    let res = await getImportList(date, loadingFail);
    setImportLists(res);

    // var res_ = res.RESPONSES;
    // if (res_) {
    //   let res__ = res_.map((x) => ({ ...x, key: x.ID }));
    // setImportLists(res__);
    // }
  }
  const load = () => {
    setIsLoading(false);
  };
  const fetchDataTable = async () => {
    setIsLoading(true);
    let res = await getImportList(date, load);
    setImportLists(res);
  };
  useEffect(() => {
    loadingStateTrue();
    getImportLists(loadingStateFail);
  }, []);

  const HandleSetSelectedData = (e) => {
    setSelectedData(e);
  };

  const handleChangeSelect = (e) => {
    setSelectStatus(e);
  };
  const defaultTitle = () => (
    <Space
      direction="horizonal"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        padding: ".8rem",
        fontWeight: "bold",
        position: "relative",
      }}
    >
      <p style={{ marginRight: "6rem" }}>Kho: </p>
      <Select
        onChange={handleChangeSelect}
        defaultValue="Chờ xác nhận"
        style={{
          width: 130,
          marginRight: "6rem",
        }}
      >
        <Option value="ALL">Tất Cả</Option>
        <Option value="EXPORT_DRAFT">Chờ xác nhận</Option>
        <Option value="EXPORTLIST_CONFIRM">Đang xử lý</Option>
        <Option value="IMPORTLIST_WAITING">Chờ nhập</Option>
      </Select>
      <RangePicker
        defaultValue={[moment(`${date.startDate}`, "YYYY-MM-DD"), moment(`${date.endDate}`, "YYYY-MM-DD")]}
        onChange={OnSelectDateChange}
      />
      <div style={{ position: "absolute", top: "50%", right: "5%" }}>
        {isLoading ? <LoadingOutlined /> : <ReloadOutlined onClick={fetchDataTable} />}
      </div>
    </Space>
  );

  const tableColumns = columns.map((item) => ({ ...item, ellipsis: true }));
  const tableProps = {
    bordered: true,
    loading,
    size: "middle",
    title: defaultTitle,
    showHeader: true,
    rowSelection: {
      onChange: (e) => HandleSetSelectedData(e),
    },
    tableLayout: "unset",
  };

  const [IsConfirmFormShow, setIsConfirmFormShow] = useState(false);
  const [IsConfirmTransferFormShow, setIsConfirmTransferFormShow] = useState(false);
  const [IsConfirmImportFormShow, setIsConfirmImportFormShow] = useState(false);
  //type:EXPORT_DRAFT
  const ShowConfirmForm = () => {
    setIsConfirmFormShow(true);
  };
  //Type:IMPORT_WAITING
  const ShowConfirmTransferForm = () => {
    setIsConfirmTransferFormShow(true);
  };
  //Type:IMPORT_ONPROCESS
  const ShowConfirmImportForm = () => {
    setIsConfirmImportFormShow(true);
  };

  const HandleClose = () => {
    setIsConfirmFormShow(false);
    setIsConfirmImportFormShow(false);
    setIsConfirmTransferFormShow(false);
  };
  const getSelectedData = () => {
    return SelectedData;
  };

  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: ["bottomRight"],
        }}
        columns={tableColumns}
        dataSource={selectStatus === "ALL" ? importLists : importLists.filter((x) => x.STATUS == selectStatus)}
        //{hasData ? importListStatus : []}
        scroll={{ y: 700 }}
      />
      <Modal title="Xác nhận phiếu" width="80%" visible={IsConfirmFormShow} onCancel={HandleClose} footer={false}>
        <FormConfirm
          detailList={detailList}
          dataTable={dataRenderTable}
          onCancel={HandleClose}
          getSelectedData={getSelectedData}
        />
      </Modal>
      <Modal
        title="Xác nhận điều chuyển tới"
        width="80%"
        visible={IsConfirmTransferFormShow}
        onCancel={HandleClose}
        footer={false}
      >
        <FormConfirmTransfer
          detailList={detailList}
          onCancel={HandleClose}
          dataTableConfirm={dataRenderTable}
          getSelectedData={getSelectedData}
        />
      </Modal>
      <Modal
        title="Xác nhận nhập kho"
        width="80%"
        visible={IsConfirmImportFormShow}
        onCancel={HandleClose}
        footer={false}
      >
        <FormConfirmImport
          detailList={detailList}
          dataTableConfirm={dataRenderTable}
          onCancel={HandleClose}
          getSelectedData={getSelectedData}
        />
      </Modal>
    </>
  );
};
export default TableWaitingForImport;
