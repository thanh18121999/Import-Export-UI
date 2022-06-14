import { Space, Modal, Table, Tag, Select, DatePicker, Button } from 'antd';
import { useState, useEffect } from 'react';
import FormConfirm from './XacNhanPhieu';
import FormConfirmTransfer from './XacNhanToi';
import FormConfirmImport from './XacNhanNhapKho';

const importLists = [
  {
    "key": "4fbe3948-d943-45b9-a95b-580c52e54d00",
    "id": "4fbe3948-d943-45b9-a95b-580c52e54d00",
    "name": "Phiếu 1",
    "description": "Phiếu thu được tạo ngày 30-5",
    "createdDate": "30-05-2022",
    "createdUser": "Thắng xe ôm",
    "status": "IMPORT_ON_PROCESS",
  },
  {
    "key": "4fbe3948-d943-45b9-a95b-580c52e54d01",
    "id": "4fbe3948-d943-45b9-a95b-580c52e54d01",
    "name": "Phiếu 2",
    "description": "Phiếu thu 2 được tạo ngày 30-5",
    "createdDate": "30-05-2022",
    "createdUser": "Thắng xe ôm",
    "status": "IMPORT_ON_PROCESS",
  },
  {
    "key": "4fbe3948-d943-45b9-a95b-580c52e54d02",
    "id": "4fbe3948-d943-45b9-a95b-580c52e54d02",
    "name": "Phiếu 3",
    "description": "Phiếu thu 3",
    "createdDate": "30-05-2022",
    "createdUser": "Fhuc Boiz",
    "status": "IMPORT_WAITING",
  },
  {
    "key": "4fbe3948-d943-45b9-a95b-580c52e54d03",
    "id": "4fbe3948-d943-45b9-a95b-580c52e54d03",
    "name": "Phiếu 4",
    "description": "Phiếu 4",
    "createdDate": "30-05-2022",
    "createdUser": "Fhuc Boiz",
    "status": "IMPORT_WAITING",
  },
  {
    "key": "4fbe3948-d943-45b9-a95b-580c52e54d04",
    "id": "4fbe3948-d943-45b9-a95b-580c52e54d04",
    "name": "Phiếu 5",
    "description": "Phiếu 5",
    "createdDate": "30-05-2022",
    "createdUser": "Fhuc Boiz",
    "status": "IMPORT_WAITING",
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
  const { Option } = Select;
  const { RangePicker } = DatePicker;

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
      // {
      //   title: 'Chi tiết phiếu nhập',
      //   key: 'action',
      //   width : 'auto',
      //   render: (_,record) => (
      //       <Tag color={"green"} onClick={()=>ShowConfirmForm(record)}>
      //          XEM CHI TIẾT
      //       </Tag>
      //   )
      // },
  ];

  const HandleSetSelectedData = (e)=>{
    setSelectedData(e)
  }

  const defaultTitle = () => 
    <Space direction="horizonal" style={{display : 'flex', justifyContent: 'flex-start', padding : '.8rem', fontWeight : 'bold',}}>
      <p style={{marginRight: '6rem'}}>Kho: </p>
      <Select
        defaultValue="Chờ xác nhận"
        style={{
          width: 130,
          marginRight: '6rem'
        }}
      >
        <Option value="Chờ xác nhận">Chờ xác nhận</Option>
        <Option value="Đang xử lý">Đang xử lý</Option>
        <Option value="Chờ nhập">Chờ nhập</Option>
      </Select>
      <RangePicker
        format="DD-MM-YYYY"
      />
      <Button onClick={ShowConfirmForm} hidden={!SelectedData.length} type="primary">Xác nhận</Button>
      <Button onClick={ShowConfirmTransferForm} hidden={!SelectedData.length} type="primary">Xác nhận tới</Button>
      <Button onClick={ShowConfirmImportForm} hidden={!SelectedData.length} type="primary">Xác nhận nhập kho</Button>
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
  const [IsConfirmFormShow, setIsConfirmFormShow] = useState(false);
  const [IsConfirmTransferFormShow, setIsConfirmTransferFormShow] = useState(false);
  const [IsConfirmImportFormShow, setIsConfirmImportFormShow] = useState(false);

  const ShowConfirmForm = () => {
    setIsConfirmFormShow(true);
  };
  const ShowConfirmTransferForm = () => {
    setIsConfirmTransferFormShow(true);
  };
  const ShowConfirmImportForm = () => {
    setIsConfirmImportFormShow(true);
  };
  
  const HandleClose = () => {
    setIsConfirmFormShow(false);
    setIsConfirmImportFormShow(false);
    setIsConfirmTransferFormShow(false);
  };
  const  getSelectedData = () =>{
    return SelectedData;
  };

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
      <Modal title="Xác nhận phiếu" width = '100%' visible={IsConfirmFormShow} onCancel={HandleClose} footer={false}>
        < FormConfirm onCancel={HandleClose} getSelectedData = {getSelectedData}/>
      </Modal> 
      <Modal title="Xác nhận điều chuyển tới" width = '100%' visible={IsConfirmTransferFormShow} onCancel={HandleClose} footer={false}>
        < FormConfirmTransfer onCancel={HandleClose} getSelectedData = {getSelectedData}/>
      </Modal> 
      <Modal title="Xác nhận nhập kho" width = '100%' visible={IsConfirmImportFormShow} onCancel={HandleClose} footer={false}>
        < FormConfirmImport onCancel={HandleClose} getSelectedData = {getSelectedData}/>
      </Modal> 
    </>
  );
};
export default TableWaitingForImport;