import { Space, Table, Modal, Tag,Card, Button, message } from 'antd';
import Title from 'antd/lib/skeleton/Title';
import { useState, useEffect } from 'react';
import FormConfirmExport from './FormConfirmExport';
import {getReleasedOrder} from '../Service';
const columns = [
  {
    title:'Mã đơn hàng',
    dataIndex: 'ORDERCODE',
    width: 'auto',
    render: (text) => <a>{text}</a>
  },
  {
      title:'Địa chỉ gửi',
      dataIndex: 'SENDERADDRESS',
      width: 'auto',
  },
  {
      title:'Địa chỉ nhận',
      dataIndex: 'RECEIVERADDRESS',
      width: 'auto',
  },
  {
      title:'Khối lượng',
      dataIndex: 'WEIGHT',
      width: 'auto',
  },
  {
      title:'COD',
      dataIndex: 'COD',
      width: 'auto',
  },
  {
      title:'Action',
      dataIndex: 'action',
      width: 'auto',
      render:(text) => (
          <Tag color = {'green'}>
              GIAO BƯU TÁ
          </Tag>
      )
  },
];
const data = [
  {
      "key": "4fbe3948-d943-45b9-a95b-580c52e54d00",
      "id": "4fbe3948-d943-45b9-a95b-580c52e54d00",
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
  }
]

const defaultExpandable = {
  expandedRowRender: (record) => <Space direction="horizonal" size="middle" style={{ display: 'grid', gridTemplateColumns : "1fr 1fr 1fr" }}>
                                    
                                </Space>,
};
const TableInWarehouse = () => {
    const [data,setData] = useState([]);
    const [hasData, setHasData] = useState(true);
    const [SelectedData, setSelectedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const successMessage = () => {
        message.success("Nhập kho thành công")
    } 
    const failMessage = () => {
        message.error("Nhập kho thất bại")
    } 

async function getReleasedData(){
  var res = await getReleasedOrder()
  if (res !== null)
  {
    let _res = res.RESPONSES.map(x => ({...x,key: x.ID}))
    setData(_res);
  }
}
useEffect( () => {
   getReleasedData();
},[])
console.log(data);



    const defaultTitle = () => <Space direction="horizonal" style={{display : 'flex', justifyContent : 'space-between', padding : '.8rem', fontWeight : 'bold',}}>
                                    <p>Kho: </p>
                                    <Space>
                                      <Button onClick={ShowConfirmExport} hidden={!SelectedData.length} type="primary">Điều chuyển</Button>
                                      <Button hidden={!SelectedData.length} type="primary">Giao nhận</Button>
                                    </Space>                                
                                </Space>;    
  const HandleSetSelectedData = (e) =>{
    setSelectedData(e)
  }
  const tableColumns = columns.map((item) => ({ ...item, ellipsis : true }));
  const tableProps = {
    bordered : true,
    loading,
    size : 'middle',
    expandable : defaultExpandable,
    title:  defaultTitle,
    showHeader : true,
    rowSelection : {
        onChange : (e) => HandleSetSelectedData(e) 
    },
    tableLayout : 'unset' ,
  };
  const [IsConfirmExportShow, setIsConfirmExportShow] = useState(false);

  const ShowConfirmExport = () => {
    setIsConfirmExportShow(true);
  };
  const HandleClose = () => {
    setIsConfirmExportShow(false);
  };
  const  getSelectedData = () =>{
    var dataSelected = data.filter(x=> SelectedData.includes(x.ID));
    return dataSelected;
  }

  const deleteData = (item) => {
    let newData = [...SelectedData]
    let index = SelectedData.indexOf(item.ID)
    if (index !== -1) {
      newData.splice(index, 1)
      setSelectedData(newData)
    }
  }

  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={{y : 700}}
      />
      <Modal title="Phiếu xuất kho" width = '80%' visible={IsConfirmExportShow} onCancel={HandleClose} footer={null}  >
        < FormConfirmExport onCancel={HandleClose} getSelectedData = {getSelectedData} deleteData = {deleteData} />
      </Modal>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    </>
  );
};
export default TableInWarehouse;