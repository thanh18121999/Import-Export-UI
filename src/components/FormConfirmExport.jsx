import {
  Card,
  DatePicker,
  Space,
  Divider,
  Avatar,
  Descriptions,
  List,
  Tabs,
  Input,
  Badge,
  Button,
  Tag,
  Skeleton,
  Alert,
  Tooltip,
  message,
} from "antd";
// import { Button } from 'antd/lib/radio';
import { useState, useEffect } from "react";
import { CloseOutlined, HomeFilled, ContainerFilled } from "@ant-design/icons";
import { getWarehouseList, createExportTranferList } from "../Service";
const { TextArea } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const FormChosenWareHouse = (props) => {
  const { getSelectedData, deleteData, onCancel, resetData } = props;
  const dataSelected = getSelectedData();
  const [Warehouses, SetWarehouses] = useState([]);
  const [DataCreateValidation, SetDataCreateValidation] = useState({
    Name: "",
    Description: "",
    Import_To: "",
    Export_Date: "",
  });
  const [DataCreateTranferExport, SetdataCreateTranferExport] = useState({
    ImexportList: {
      Name: "",
      Description: "",
      Import_To: "",
      Export_Date: "",
    },
    IDOrderShippings: dataSelected.map((x) => x.ID),
  });
  const [ChosenWareHouse, SetChosenWareHouse] = useState(null);
  async function fetchWarehouseList() {
    var res = await getWarehouseList();
    if (res) {
      SetWarehouses(res.RESPONSES);
    }
  }
  useEffect(() => {
    fetchWarehouseList();
  }, []);
  const HandleClose = () => {
    SetDataCreateValidation({
      Name: "",
      Description: "",
      Import_To: "",
      Export_Date: "",
    });
    SetdataCreateTranferExport({
      ImexportList: {
        Name: "",
        Description: "",
        Import_To: "",
        Export_Date: "",
      },
      IDOrderShippings: dataSelected.map((x) => x.ID),
    });
    SetChosenWareHouse(null);
    onCancel();
  };
  const OnTypingData = (e) => {
    SetDataCreateValidation((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
    SetdataCreateTranferExport((prevState) => ({
      ...prevState,
      ImexportList: {
        ...prevState.ImexportList,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const OnSelectDateChange = (e) => {
    SetdataCreateTranferExport((prevState) => ({
      ...prevState,
      ImexportList: {
        ...prevState.ImexportList,
        Export_Date: e.format("MM-DD-YYYY"),
      },
    }));
    SetDataCreateValidation((prevState) => ({
      ...prevState,
      Export_Date: "",
    }));
  };
  const HandleChosenWareHouse = (e) => {
    SetChosenWareHouse(e);
    SetdataCreateTranferExport((prevState) => ({
      ...prevState,
      ImexportList: {
        ...prevState.ImexportList,
        Import_To: e.WAREHOUSECODE,
      },
    }));
    SetDataCreateValidation((prevState) => ({
      ...prevState,
      Import_To: "",
    }));
  };
  useEffect(() => {
    if (dataSelected.length <= 0) {
      HandleClose();
      onCancel();
    }
  }, [dataSelected.length === 0]);
  const successFunc = () => {
    message.success("Tạo thành công");
  };
  const failFunc = () => {
    message.error("Tạo thất bại");
  };
  const HandleCreateExportList = async () => {
    let valid = true;
    Object.keys(DataCreateTranferExport.ImexportList).forEach((key) => {
      if (DataCreateTranferExport.ImexportList[key] == "") {
        SetDataCreateValidation((prevState) => ({
          ...prevState,
          [key]: key == "Import_To" || key == "Export_Date" ? "Vui lòng chọn" : "Vui lòng nhập",
        }));
        valid = false;
      }
    });
    if (valid) {
      var res = await createExportTranferList(DataCreateTranferExport, successFunc, failFunc);
      if (res) {
        console.log("res", res);
        resetData();
      }
    }
  };
  return (
    <>
      <Space
        direction="horizonal"
        size="middle"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 2fr 1.5fr",
        }}
      >
        <Card style={{ height: "100%" }}>
          <p style={{ fontSize: "18px", fontWeight: "700" }}>Chọn kho</p>
          <Divider orientation="left">Danh sách kho</Divider>
          <List
            style={{ height: "266px", overflow: "auto" }}
            itemLayout="horizontal"
            dataSource={Warehouses}
            renderItem={(warehouses) => (
              <List.Item
                onClick={() => HandleChosenWareHouse(warehouses)}
                style={{
                  cursor: "pointer",
                  backgroundColor: ChosenWareHouse && warehouses.ID === ChosenWareHouse.ID ? "#e6f7ff" : null,
                }}
              >
                <List.Item.Meta
                  style={{ padding: "0 .5rem" }}
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#e8774f",
                        verticalAlign: "middle",
                      }}
                      icon={<HomeFilled />}
                    />
                  }
                  title={<a>{warehouses.NAME}</a>}
                  description={warehouses.LOCATION}
                />
              </List.Item>
            )}
          />
        </Card>
        {/* <Divider type="vertical" style={{height : '100%'}}/> */}
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin phiếu xuất kho" key="1">
            <Space direction="vertical" style={{ display: "flex", rowGap: "1rem" }}>
              <Space direction="horizonal">
                <Input
                  placeholder={DataCreateValidation.Name ? DataCreateValidation.Name : ""}
                  status={DataCreateValidation.Name ? "error" : "default"}
                  value={DataCreateTranferExport.ImexportList.Name}
                  name="Name"
                  addonBefore="Tên phiếu: "
                  onChange={OnTypingData}
                />
                <Input
                  placeholder={DataCreateValidation.Import_To ? DataCreateValidation.Import_To : ""}
                  status={DataCreateValidation.Import_To ? "error" : "default"}
                  readOnly
                  value={ChosenWareHouse ? ChosenWareHouse.WAREHOUSECODE : ""}
                  name="Import_To"
                  addonBefore="Kho đến: "
                  onChange={OnTypingData}
                />
              </Space>
              <Space direction="horizonal">
                <Tag
                  color={"default"}
                  style={{ fontSize: "0.825rem", padding: "0.3rem 0.5rem", marginRight: "-.525rem" }}
                >
                  Chọn ngày xuất:
                </Tag>
                <DatePicker
                  status={DataCreateValidation.Export_Date ? "error" : "default"}
                  name="Export_Date"
                  onChange={OnSelectDateChange}
                  placeholder="Chọn ngày"
                />
              </Space>
              <Divider orientation="left">Mô tả</Divider>
              <TextArea
                placeholder={DataCreateValidation.Description ? DataCreateValidation.Description : "Nhập mô tả"}
                status={DataCreateValidation.Description ? "error" : "default"}
                value={DataCreateTranferExport.ImexportList.Description}
                name="Description"
                rows={5}
                onChange={OnTypingData}
              />
            </Space>
          </TabPane>
          <TabPane
            tab={
              <Badge style={{ marginTop: "-5px" }} count={ChosenWareHouse ? ChosenWareHouse.NAME : ""} color="cyan">
                Thông tin kho xuất tới
              </Badge>
            }
            key="2"
          >
            <Card size="middle">
              <Space
                direction="horizonal"
                size="middle"
                style={{
                  display: "block",
                }}
              >
                {ChosenWareHouse ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Avatar
                        style={{
                          backgroundColor: "#f7ce4d",
                          verticalAlign: "middle",
                        }}
                        size={{ xs: 24, sm: 32, md: 70, lg: 64, xl: 80, xxl: 100 }}
                        icon={<HomeFilled />}
                      />
                    </div>
                    <Divider type="horizonal" style={{ height: "100%" }} />
                    <Descriptions column={4}>
                      <Descriptions.Item span={4} label="Tên">
                        {ChosenWareHouse.NAME ? ChosenWareHouse.NAME : "Chưa cập nhật"}
                      </Descriptions.Item>
                      <Descriptions.Item span={4} label="Vị trí">
                        {ChosenWareHouse.LOCATION ? ChosenWareHouse.LOCATION : "Chưa cập nhật"}
                      </Descriptions.Item>
                      <Descriptions.Item span={2} label="Quốc gia">
                        {ChosenWareHouse.COUNTRYCODE ? ChosenWareHouse.COUNTRYCODE : "Chưa cập nhật"}
                      </Descriptions.Item>
                      <Descriptions.Item span={2} label="Tỉnh">
                        {ChosenWareHouse.CITYCODE ? ChosenWareHouse.CITYCODE : "Chưa cập nhật"}
                      </Descriptions.Item>
                      <Descriptions.Item span={2} label="Quận">
                        {ChosenWareHouse.DISTRICTCODE ? ChosenWareHouse.DISTRICTCODE : "Chưa cập nhật"}
                      </Descriptions.Item>
                      <Descriptions.Item span={2} label="Phường">
                        {ChosenWareHouse.WARECODE ? ChosenWareHouse.WARECODE : "Chưa cập nhật"}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                ) : (
                  <>
                    <Alert message="Chưa chọn kho" type="warning" showIcon />
                    <Skeleton></Skeleton>
                  </>
                )}
              </Space>
              <Space
                direction="horizonal"
                size="middle"
                style={{
                  display: "flex",
                }}
              ></Space>
            </Card>
          </TabPane>
        </Tabs>
        <Card style={{ height: "100%" }}>
          <Divider orientation="left">Danh sách đơn</Divider>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: ".5rem" }}>
            <Button hidden type="primary">
              Thêm đơn
            </Button>
          </div>
          <List
            style={{ height: 265, padding: ".7rem", overflow: "auto" }}
            itemLayout="horizontal"
            dataSource={dataSelected}
            renderItem={(orders) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#f7ce4d",
                        verticalAlign: "middle",
                      }}
                      icon={<ContainerFilled />}
                    />
                  }
                  title={<a>{orders.ORDERCODE}</a>}
                  description={orders.SENDERNAME + " - " + orders.SENDERPHONE}
                />
                <Tooltip placement="rightTop" title={"Nhấn để xóa"}>
                  <CloseOutlined onClick={() => deleteData(orders)} style={{ fontSize: "20px" }} />
                </Tooltip>
              </List.Item>
            )}
          />
        </Card>
      </Space>
      <Space
        direction="horizonal"
        size="middle"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          columnGap: ".8rem",
          padding: ".7rem 0",
        }}
      >
        <Button
          onClick={() => {
            HandleClose();
          }}
        >
          Đóng
        </Button>
        <Button style={{ backgroundColor: "#36bf71", color: "white" }} onClick={HandleCreateExportList}>
          Xuất kho
        </Button>
      </Space>
    </>
  );
};

export default FormChosenWareHouse;
