import { Space, Tag, Input, Table, DatePicker,Card, Popconfirm, Dropdown, message, Menu } from 'antd';
import { Button } from 'antd/lib/radio';
import { useState } from 'react';

const orders = [
    {
        "key": "4fbe3948-d943-45b9-a95b-580c52e54d00",
        "id": "4fbe3948-d943-45b9-a95b-580c52e54d00",
        "ticketID": "4fbe3948-d943-45b9-a95b-580c52e54d00",
        "shipno": "IUTTGVET1",
        "dropofftype": "1",
        "servicetype": "1",
        "ordercode": "IUTTGVET",
        "shippingchargespayment": "Sender",
        "deliverystatus": "PICKUP_WAITING",
        "timeregister": "5/19/2022 3:45:51 PM",
        "sendername": "Thành vip pro",
        "senderphone": "0123456789",
        "senderaddress": "thu duc, vn",
        "sendercountrycode": "VN",
        "sendercitycode": "VN-SG",
        "senderdistrictcode": "71010",
        "senderwardcode": "71020",
        "senderpostalcode": "71000",
        "receivername": "test3",
        "receiverphone": "0987654321",
        "receiveraddress": "hanoi, vn",
        "receivercountrycode": "VN",
        "receivercitycode": "VN-HN",
        "receiverdistrictcode": "Cầu Giấy",
        "receiverwardcode": "1",
        "receiverpostalcode": "100000",
        "totalpackages": 2,
        "servicepostage": 1,
        "addedpostage": 1,
        "codpostage": 1,
        "surcharge": 1,
        "totalpostage": 1,
        "vat": 1,
        "weight": 12,
        "cod": 300,
        "currency": "VND",
        "content": null,
        "note": null,
        "warehouse": "WH01"
    },
    {
        "key": "47fb9e2a-840f-4444-b730-24ddb31cddca",
        "id": "47fb9e2a-840f-4444-b730-24ddb31cddca",
        "ticketID": "4fbe3948-d943-45b9-a95b-580c52e54d00",
        "shipno": "EGDUIEEH1",
        "dropofftype": "1",
        "servicetype": "1",
        "ordercode": "EGDUIEEH",
        "shippingchargespayment": "Sender",
        "deliverystatus": "PICKUP_WAITING",
        "timeregister": "5/19/2022 4:15:14 PM",
        "sendername": "Thắng ",
        "senderphone": "0747852369",
        "senderaddress": "01/01",
        "sendercountrycode": "VN",
        "sendercitycode": "VN-SG",
        "senderdistrictcode": "71010",
        "senderwardcode": "P3",
        "senderpostalcode": "700000",
        "receivername": "Thành ",
        "receiverphone": "0926985147",
        "receiveraddress": "02/01",
        "receivercountrycode": "VN",
        "receivercitycode": "VN-HN",
        "receiverdistrictcode": "Cầu Giấy",
        "receiverwardcode": "P3",
        "receiverpostalcode": "100000",
        "totalpackages": 1,
        "servicepostage": 1,
        "addedpostage": 1,
        "codpostage": 1,
        "surcharge": 1,
        "totalpostage": 1,
        "vat": 1,
        "weight": 65,
        "cod": 10,
        "currency": "VND",
        "content": null,
        "note": null,
        "warehouse": "WH01"
    },
    {
      "key": "47fb9e2a-840f-4444-b730-24ddb31cddcx",
      "id": "47fb9e2a-840f-4444-b730-24ddb31cddcx",
      "ticketID": "4fbe3948-d943-45b9-a95b-580c52e54d01",
      "shipno": "EGDUIEEH2",
      "dropofftype": "1",
      "servicetype": "1",
      "ordercode": "EGDUBGEH",
      "shippingchargespayment": "Sender",
      "deliverystatus": "PICKUP_WAITING",
      "timeregister": "5/19/2022 4:15:14 PM",
      "sendername": "Thắng cute ",
      "senderphone": "0747852369",
      "senderaddress": "Heaven",
      "sendercountrycode": "VN",
      "sendercitycode": "VN-SG",
      "senderdistrictcode": "71010",
      "senderwardcode": "P3",
      "senderpostalcode": "700000",
      "receivername": "Phúc Boiz ",
      "receiverphone": "0926985147",
      "receiveraddress": "Hell",
      "receivercountrycode": "VN",
      "receivercitycode": "VN-HN",
      "receiverdistrictcode": "Cầu Giấy",
      "receiverwardcode": "P3",
      "receiverpostalcode": "100000",
      "totalpackages": 1,
      "servicepostage": 1,
      "addedpostage": 1,
      "codpostage": 1,
      "surcharge": 1,
      "totalpostage": 1,
      "vat": 1,
      "weight": 65,
      "cod": 10,
      "currency": "VND",
      "content": null,
      "note": null,
      "warehouse": "WH01"
    }
];

const FormConfirmImport = () => {

    const dateFormat = 'DD/MM/YYYY';
    const [SelectedData, setSelectedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(orders);
    const [chosenData, setChosenData] = useState([])
    const [visible, setVisible] = useState(false);

    const chooseOrder = (e)=>{
        const temp = [...data]
        const chosenItem = temp.find((item)=> item.id === e.id)
        setChosenData([...chosenData,chosenItem])
        const idx = temp.findIndex((item)=> item.id === e.id)
        const temp1 = [...data]
        temp1.splice(idx,1) 
        setData(temp1)
    }
    const unChooseOrder = (e)=>{
        const temp = [...chosenData]
        const chosenItem = temp.find((item)=> item.id === e.id)
        setData([...data,chosenItem])
        const idx = temp.findIndex((item)=> item.id === e.id)
        const temp1 = [...chosenData]
        temp1.splice(idx,1) 
        setChosenData(temp1)
    }

    const HandleSetSelectedData = (e)=>{
        setSelectedData(e)
    }
    // table
    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a onClick={chooseOrder}>
                  Nhập kho
                </a>
              ),
            },
            {
              key: '2',
              label: (
                <a>
                  Chênh lệch
                </a>
              ),
            },
          ]}
        />
      );

    const listOrderColumns = [
        {
          title: 'Mã đơn',
          dataIndex: 'ordercode',
          key: 'ordercode',
          width : '20%',
          render: (text) => <a>{text}</a>
        },
        {
          title: 'Địa chỉ gửi',
          dataIndex: 'senderaddress',
          width : '20%',
        },
        {
          title: 'Địa chỉ nhận',
          dataIndex: 'receiveraddress',
          width : '20%',
        },
        {
          title: 'Khối lượng',
          dataIndex: 'weight',
          width : '20%',
        },
        {
          key: 'action',
          width : 'auto',
          render: () => (
            <Dropdown overlay ={menu}>
                <a>
                    <Space>
                        Chọn hành động
                    </Space>
                </a>
            </Dropdown>
          )
        },
    ];
    const chosenColumns = [
        {
          title: 'Mã đơn',
          dataIndex: 'ordercode',
          key: 'ordercode',
          width : '20%',
          render: (text) => <a>{text}</a>
        },
        {
          title: 'Địa chỉ gửi',
          dataIndex: 'senderaddress',
          width : '20%',
        },
        {
          title: 'Địa chỉ nhận',
          dataIndex: 'receiveraddress',
          width : '20%',
        },
        {
          title: 'Khối lượng',
          dataIndex: 'weight',
          width : '20%',
        },
        {
          key: 'action',
          width : 'auto',
          render: (_,record) => (
              <Tag color={"red"} onClick={()=>unChooseOrder(record)}>
                 Xóa
              </Tag>
          )
        },
    ];
    const dropColumns = [
        {
          title: 'Mã đơn',
          dataIndex: 'ordercode',
          key: 'ordercode',
          width : '20%',
          render: (text) => <a>{text}</a>
        },
        {
          title: 'Địa chỉ gửi',
          dataIndex: 'senderaddress',
          width : '20%',
        },
        {
          title: 'Địa chỉ nhận',
          dataIndex: 'receiveraddress',
          width : '20%',
        },
        {
          title: 'Khối lượng',
          dataIndex: 'weight',
          width : '20%',
        },
        {
          key: 'action',
          width : 'auto',
          render: (_,record) => (
              <Tag color={"red"} onClick={()=>unChooseOrder(record)}>
                 Xóa
              </Tag>
          )
        },
    ];
    // end table
    const listOrderColumn = listOrderColumns.map((item) => ({ ...item, ellipsis : true }));
    const chosenColumn = chosenColumns.map((item) => ({ ...item, ellipsis : true }));
    const dropColumn = dropColumns.map((item) => ({ ...item, ellipsis : true }));
    const listOrderProps = {
    bordered : true,
    pagination : false,
    loading,
    size : 'middle',
    showHeader : true,
    rowSelection : {
        onChange : (e) => HandleSetSelectedData(e) 
    },
    tableLayout : 'unset' ,
    };
    const chosenProps = {
        bordered : true,
        pagination : false,
        loading,
        size : 'middle',
        showHeader : true,
        tableLayout : 'unset' ,
    };

    const showPopconfirm = () => {
        setVisible(true);
    };
    const confirm = (e) => {
        message.success('Success');
        setVisible(false);
    };
    const cancel = (e) => {
        message.error('Error');
        setVisible(false);
    };

    return (
    <>
    <Space
        direction="horizontal"
        size="middle"
        style={{
            display: 'flex',
        }}
    >
            <Space direction="vertical">
                <Space direction="horizontal">
                    <Input name='Name' addonBefore="Mã phiếu " />
                    <Input name='Name' addonBefore="Tên phiếu " />
                    <DatePicker
                        format={dateFormat}
                        placeholder="Ngày tạo"
                    />
                </Space>
            </Space>
    </Space>
    <Space
        direction="horizontal"
        size="middle"
        style={{
            display: 'flex',
        }}
    >
        <Card>
            Danh sách đơn hàng trong phiếu
            <Table
                {...listOrderProps}
                columns={listOrderColumn}
                dataSource={data}
                scroll={{y : 700}}
            >
            </Table>
        </Card>
    </Space>
    <Space
        direction="horizontal"
        size="middle"
        style={{
            display: 'flex',
        }}
    >
        <Card>
            Danh sách đơn hàng chọn lưu kho
            <Table
                {...chosenProps}
                columns={chosenColumn}
                dataSource={chosenData}
                scroll={{y : 700}}
            >
            </Table>
        </Card>
        <Card>
            Danh sách đơn hàng chênh lệch
            <Table
                {...chosenProps}
                columns={dropColumn}
                scroll={{y : 700}}
            >
            </Table>
        </Card>
    </Space>
    <Popconfirm
        title="Xác nhận nhập kho các đơn hàng được chọn?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Xác nhận"
        cancelText="Hủy"
        visible={visible}
    >
        <Button 
            onClick={showPopconfirm}
            type="primary" 
        >Xác nhận nhập kho</Button>
        
    </Popconfirm>
    </>
    );
}

export default FormConfirmImport;