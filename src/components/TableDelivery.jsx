import {Form,Radio,Space,Switch,Table,Tag,Card,Button,
  message,Modal,Divider,List,Tabs,Badge, Dropdown, Menu,} from "antd";
import { useState, useEffect } from "react";
import { MoreOutlined } from '@ant-design/icons';

const {TabPane} = Tabs;
const orders = [
  {
    key: "4fbe3948-d943-45b9-a95b-580c52e54d00",
    id: "4fbe3948-d943-45b9-a95b-580c52e54d00",
    shipno: "IUTTGVET1",
    dropofftype: "1",
    servicetype: "1",
    ordercode: "IUTTGVET",
    shippingchargespayment: "Sender",
    deliverystatus: "PICKUP_WAITING",
    timeregister: "5/19/2022 3:45:51 PM",
    sendername: "Thành vip pro",
    senderphone: "0123456789",
    senderaddress: "thu duc, vn",
    sendercountrycode: "VN",
    sendercitycode: "VN-SG",
    senderdistrictcode: "71010",
    senderwardcode: "71020",
    senderpostalcode: "71000",
    receivername: "test3",
    receiverphone: "0987654321",
    receiveraddress: "hanoi, vn",
    receivercountrycode: "VN",
    receivercitycode: "VN-HN",
    receiverdistrictcode: "Cầu Giấy",
    receiverwardcode: "1",
    receiverpostalcode: "100000",
    totalpackages: 2,
    servicepostage: 1,
    addedpostage: 1,
    codpostage: 1,
    surcharge: 1,
    totalpostage: 1,
    vat: 1,
    weight: 12,
    cod: 300,
    currency: "VND",
    content: null,
    note: null,
    warehouse: "WH01",
  },
  {
    key: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    id: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    shipno: "EGDUIEEH1",
    dropofftype: "1",
    servicetype: "1",
    ordercode: "EGDUIEEH",
    shippingchargespayment: "Sender",
    deliverystatus: "PICKUP_WAITING",
    timeregister: "5/19/2022 4:15:14 PM",
    sendername: "Thắng ",
    senderphone: "0747852369",
    senderaddress: "01/01",
    sendercountrycode: "VN",
    sendercitycode: "VN-SG",
    senderdistrictcode: "71010",
    senderwardcode: "P3",
    senderpostalcode: "700000",
    receivername: "Thành ",
    receiverphone: "0926985147",
    receiveraddress: "tphcm, vn",
    receivercountrycode: "VN",
    receivercitycode: "VN-HN",
    receiverdistrictcode: "Cầu Giấy",
    receiverwardcode: "P3",
    receiverpostalcode: "100000",
    totalpackages: 1,
    servicepostage: 1,
    addedpostage: 1,
    codpostage: 1,
    surcharge: 1,
    totalpostage: 1,
    vat: 1,
    weight: 65,
    cod: 10,
    currency: "VND",
    content: null,
    note: null,
    warehouse: "WH01",
  },
  {
    key: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    id: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    shipno: "EGDUIEEH2",
    dropofftype: "1",
    servicetype: "1",
    ordercode: "EGDUIEEH2",
    shippingchargespayment: "Sender",
    deliverystatus: "PICKUP_WAITING",
    timeregister: "5/19/2022 4:15:14 PM",
    sendername: "Thắng ",
    senderphone: "0747852369",
    senderaddress: "01/01",
    sendercountrycode: "VN",
    sendercitycode: "VN-SG",
    senderdistrictcode: "71010",
    senderwardcode: "P3",
    senderpostalcode: "700000",
    receivername: "Thành ",
    receiverphone: "0926985147",
    receiveraddress: "danang, vn",
    receivercountrycode: "VN",
    receivercitycode: "VN-HN",
    receiverdistrictcode: "Cầu Giấy",
    receiverwardcode: "P3",
    receiverpostalcode: "100000",
    totalpackages: 1,
    servicepostage: 1,
    addedpostage: 1,
    codpostage: 1,
    surcharge: 1,
    totalpostage: 1,
    vat: 1,
    weight: 65,
    cod: 10,
    currency: "VND",
    content: null,
    note: null,
    warehouse: "WH01",
  },
  {
    key: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    id: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    shipno: "EGDUIEEH3",
    dropofftype: "1",
    servicetype: "1",
    ordercode: "EGDUIEEH3",
    shippingchargespayment: "Sender",
    deliverystatus: "PICKUP_WAITING",
    timeregister: "5/19/2022 4:15:14 PM",
    sendername: "Thắng ",
    senderphone: "0747852369",
    senderaddress: "01/01",
    sendercountrycode: "VN",
    sendercitycode: "VN-SG",
    senderdistrictcode: "71010",
    senderwardcode: "P3",
    senderpostalcode: "700000",
    receivername: "Thành ",
    receiverphone: "0926985147",
    receiveraddress: "binhthuan, vn",
    receivercountrycode: "VN",
    receivercitycode: "VN-HN",
    receiverdistrictcode: "Cầu Giấy",
    receiverwardcode: "P3",
    receiverpostalcode: "100000",
    totalpackages: 1,
    servicepostage: 1,
    addedpostage: 1,
    codpostage: 1,
    surcharge: 1,
    totalpostage: 1,
    vat: 1,
    weight: 65,
    cod: 10,
    currency: "VND",
    content: null,
    note: null,
    warehouse: "WH01",
  },
  {
    key: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    id: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    shipno: "EGDUIEEH4",
    dropofftype: "1",
    servicetype: "1",
    ordercode: "EGDUIEEH4",
    shippingchargespayment: "Sender",
    deliverystatus: "PICKUP_WAITING",
    timeregister: "5/19/2022 4:15:14 PM",
    sendername: "Thắng ",
    senderphone: "0747852369",
    senderaddress: "01/01",
    sendercountrycode: "VN",
    sendercitycode: "VN-SG",
    senderdistrictcode: "71010",
    senderwardcode: "P3",
    senderpostalcode: "700000",
    receivername: "Thành ",
    receiverphone: "0926985147",
    receiveraddress: "hue, vn",
    receivercountrycode: "VN",
    receivercitycode: "VN-HN",
    receiverdistrictcode: "Cầu Giấy",
    receiverwardcode: "P3",
    receiverpostalcode: "100000",
    totalpackages: 1,
    servicepostage: 1,
    addedpostage: 1,
    codpostage: 1,
    surcharge: 1,
    totalpostage: 1,
    vat: 1,
    weight: 65,
    cod: 10,
    currency: "VND",
    content: null,
    note: null,
    warehouse: "WH01",
  },
  {
    key: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    id: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    shipno: "EGDUIEEH5",
    dropofftype: "1",
    servicetype: "1",
    ordercode: "EGDUIEEH5",
    shippingchargespayment: "Sender",
    deliverystatus: "PICKUP_WAITING",
    timeregister: "5/19/2022 4:15:14 PM",
    sendername: "Thắng ",
    senderphone: "0747852369",
    senderaddress: "01/01",
    sendercountrycode: "VN",
    sendercitycode: "VN-SG",
    senderdistrictcode: "71010",
    senderwardcode: "P3",
    senderpostalcode: "700000",
    receivername: "Thành ",
    receiverphone: "0926985147",
    receiveraddress: "dalat, vn",
    receivercountrycode: "VN",
    receivercitycode: "VN-HN",
    receiverdistrictcode: "Cầu Giấy",
    receiverwardcode: "P3",
    receiverpostalcode: "100000",
    totalpackages: 1,
    servicepostage: 1,
    addedpostage: 1,
    codpostage: 1,
    surcharge: 1,
    totalpostage: 1,
    vat: 1,
    weight: 65,
    cod: 10,
    currency: "VND",
    content: null,
    note: null,
    warehouse: "WH01",
  },
];
const exportLists = [
  {
    key: "4fbe3948-d943-45b9-a95b-580c52e54d00",
    ticketID: "4fbe3948-d943-45b9-a95b-580c52e54d00",
    ticketName: "Phiếu 1",
    description: "Phiếu thu được tạo ngày 30-5",
    createdDate: "30-05-2022",
    createdUser: "Thắng xe ôm",
    status: "In Warehouse ",
  },
  {
    key: "4fbe3948-d943-45b9-a95b-580c52e54d01",
    ticketID: "4fbe3948-d943-45b9-a95b-580c52e54d01",
    ticketName: "Phiếu 2",
    description: "Phiếu thu 2 được tạo ngày 30-5",
    createdDate: "30-05-2022",
    createdUser: "Thắng xe ôm",
    status: "In Warehouse ",
  },
];
// Dropdown PTC/PTB/PL
const dropDownOrder = (
  <Menu
    items={[
      {
        label: <Space onClick={()=> alert('PTC')}>Phát thành công</Space>,
        key: '1',
      },
      {
        type: 'divider',
      },
      {
        label: <Space onClick={()=> alert('PTB')}>Phát thất bại</Space>,
        key: '2',
      },
      {
        type: 'divider',
      },
      {
        label: <Space onClick={()=> alert('PL')}>Phát lại</Space>,
        key: '3',
      },
    ]}
  />
);

//End Dropdown PTC/PTB/PL
const defaultExpandable = {
  expandedRowRender: (record) => (
    <Space
      direction="horizonal"
      size="middle"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
    ></Space>
  ),
};
const TableWaitingForExport = () => {
  const [data, setData] = useState([]);
  const [SelectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(true);

  const defaultTitle = () => (
    <Space
      direction="horizonal"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: ".8rem",
        fontWeight: "bold",
      }}
    >
      <p>Kho: </p>
    </Space>
  );

  const HandleSetSelectedData = (e) => {
    setSelectedData(e);
  };

  // Modal Detail
  const [visible, setVisible] = useState(false);
  const modal_Detail = () => {
    return (
      <>
        <Button type="primary" onClick={() => setVisible(true)}>
          Xem Chi Tiết
        </Button>
        <Modal
          title="Phiếu phát"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width= '60%'
        >
          <Space
            derection="horizonal"
            size="middle"
            style={{
              display: 'grid',
              gridTemplateColumns : '1fr 1.5fr',
              alignItems: 'initial'
              }}
          >
            <Card>
                <Divider orientation="left">Danh sách đơn</Divider>
                <List 
                    style = {{height : '300px',overflow: 'auto'}}
                    itemLayout = "horizonal"
                    dataSource={orders}
                    renderItem = {(orders) => (
                        <List.Item>
                            <List.Item.Meta 
                                title={orders.ordercode}
                                description={orders.receiveraddress}
                            />
                            <Dropdown overlay={dropDownOrder} trigger={['click']}>
                              <a onClick={e => e.preventDefault()}>
                                <Space>
                                  <MoreOutlined style={{fontSize:"18px",color:"#000"}} />
                                </Space>
                              </a>
                            </Dropdown>
                        </List.Item>
                    )}
                />
            </Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Phát thành công" key="1">
                <List
                  style={{height:"266px",overflow:"auto"}}
                  itemLayout= "horizonal"
                  dataSource= {orders}
                  renderItem ={(ordersSuccess) => (
                    <List.Item>
                      <List.Item.Meta
                        title ={ordersSuccess.ordercode}
                        description={ordersSuccess.receiveraddress}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="Phát thất bại" key="2">
                <List
                    style={{height:"266px",overflow:"auto"}}
                    itemLayout= "horizonal"
                    dataSource= {orders}
                    renderItem ={(ordersSuccess) => (
                      <List.Item>
                        <List.Item.Meta
                          title ={ordersSuccess.ordercode}
                          description={ordersSuccess.receiveraddress}
                        />
                      </List.Item>
                    )}
                  />
              </TabPane>
                <List
                    style={{height:"266px",overflow:"auto"}}
                    itemLayout= "horizonal"
                    dataSource= {orders}
                    renderItem ={(ordersSuccess) => (
                      <List.Item>
                        <List.Item.Meta
                          title ={ordersSuccess.ordercode}
                          description={ordersSuccess.receiveraddress}
                        />
                      </List.Item>
                    )}
                  />
              <TabPane tab="Phát lại" key="3">
                <List
                    style={{height:"266px",overflow:"auto"}}
                    itemLayout= "horizonal"
                    dataSource= {orders}
                    renderItem ={(ordersSuccess) => (
                      <List.Item>
                        <List.Item.Meta
                          title ={ordersSuccess.ordercode}
                          description={ordersSuccess.receiveraddress}
                        />
                      </List.Item>
                    )}
                  />
              </TabPane>
            </Tabs>
          </Space>
          <Space direction="horizonal"
            size="middle"
            style={{
                display: 'flex' ,
                justifyContent : 'flex-end',
            }}
          >
            <Button type="primary" >Tiếp tục</Button>
          </Space>
        </Modal>
      </>
    );
  };
  // end modal

  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "ticketID",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên phiếu",
      dataIndex: "ticketName",
      width: "auto",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "auto",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      width: "auto",
    },
    {
      title: "Người tạo",
      dataIndex: "createdUser",
      width: "auto",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "auto",
    },
    {
      title: "Chi tiết phiếu xuất",
      key: "action",
      width: "auto",
      render: () => modal_Detail(),
    },
  ];
  const tableColumns = columns.map((item) => ({ ...item, ellipsis: true }));
  const tableProps = {
    bordered: true,
    loading,
    size: "middle",
    expandable: defaultExpandable,
    title: defaultTitle,
    showHeader: true,
    rowSelection: {
      onChange: (e) => HandleSetSelectedData(e),
    },
    tableLayout: "unset",
  };
  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: ["bottomRight"],
        }}
        columns={tableColumns}
        dataSource={hasData ? exportLists : []}
        scroll={{ y: 700 }}
      />
    </>
  );
};
export default TableWaitingForExport;
