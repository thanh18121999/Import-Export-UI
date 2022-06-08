import { Space, Modal, Table, Button, message, Tag } from 'antd';
import { useState, useEffect } from 'react';
import FormConfirmImport from './FormConfirmImport';

const columns = [
  {
    title: 'Mã phiếu',
    dataIndex: 'id',
    width : '20%',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Tên phiếu',
    dataIndex: 'name',
    width : 'auto',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    width : 'auto',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    width : 'auto',
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdUser',
    width : 'auto',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width : 'auto',
  },
  {
    title: 'Chi tiết phiếu nhập',
    key: 'action',
    width : 'auto',
    render: () => (
        <Tag color={"green"}>
           XEM CHI TIẾT
        </Tag>
    )
  },
];

const importLists = [
  {
    "key": "4fbe3948-d943-45b9-a95b-580c52e54d00",
    "id": "4fbe3948-d943-45b9-a95b-580c52e54d00",
    "name": "Phiếu 1",
    "description": "Phiếu thu được tạo ngày 30-5",
    "createdDate": "30-05-2022",
    "createdUser": "Thắng xe ôm",
    "status": "In Warehouse ",
  },
  {
    "key": "4fbe3948-d943-45b9-a95b-580c52e54d01",
    "id": "4fbe3948-d943-45b9-a95b-580c52e54d01",
    "name": "Phiếu 2",
    "description": "Phiếu thu 2 được tạo ngày 30-5",
    "createdDate": "30-05-2022",
    "createdUser": "Thắng xe ôm",
    "status": "In Warehouse ",
  },
];
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
    "shipno": "EGDUIEEH1",
    "dropofftype": "1",
    "servicetype": "1",
    "ordercode": "EGDUIEEH",
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


const TableWaitingForImport = () => {
    const [data,setData] = useState([]);
    const [SelectedData, setSelectedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasData, setHasData] = useState(true);

    const HandleSetSelectedData = (e)=>{
      setSelectedData(e)
    }

  const defaultTitle = () => 
    <Space direction="horizonal" style={{display : 'flex', justifyContent : 'space-between', padding : '.8rem', fontWeight : 'bold',}}>
      <p>Kho: </p>
      <Button onClick={ShowConfirmImportForm} hidden={!SelectedData.length} type="primary">Nhập kho</Button>
    </Space>;
  
  const tableColumns = columns.map((item) => ({ ...item, ellipsis : true }));
  const tableProps = {
    bordered : true,
    loading,
    size : 'middle',
    title:  defaultTitle,
    showHeader : true,
    rowSelection : {
        onChange : (e) => HandleSetSelectedData(e) 
    },
    tableLayout : 'unset' ,
  };
  const [IsConfirmImportFormShow, setIsConfirmImportFormShow] = useState(false);

  const ShowConfirmImportForm = () => {
    setIsConfirmImportFormShow(true);
  };
  const HandleClose = () => {
    setIsConfirmImportFormShow(false);
  };
  const  getSelectedData = () =>{
    return SelectedData;
  }
  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={tableColumns}
        dataSource={hasData ? importLists : []}
        scroll={{y : 700}}
      />
      <Modal title="Phiếu nhập kho" width = '100%' visible={IsConfirmImportFormShow} onCancel={HandleClose} footer={false}>
        < FormConfirmImport onCancel={HandleClose} getSelectdddedData = {getSelectedData}/>
      </Modal> 
    </>
  );
};
export default TableWaitingForImport;