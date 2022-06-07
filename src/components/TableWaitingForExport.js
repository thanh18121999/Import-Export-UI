import { Form, Radio, Space, Switch, Table, Tag,Card, Button, message } from 'antd';
import { useState, useEffect } from 'react';

const columns = [
  {
    title: 'Mã phiếu',
    dataIndex: 'ticketID',
    width : '20%',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Tên phiếu',
    dataIndex: 'ticketName',
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
    title: 'Chi tiết phiếu xuất',
    key: 'action',
    width : 'auto',
    render: () => (
        <Button style={{backgroundColor: '#66ff99'}}>
           XEM CHI TIẾT
        </Button>
    )
  },
];
const exportLists = [
  {
    "key": "4fbe3948-d943-45b9-a95b-580c52e54d00",
    "ticketID": "4fbe3948-d943-45b9-a95b-580c52e54d00",
    "ticketName": "Phiếu 1",
    "description": "Phiếu thu được tạo ngày 30-5",
    "createdDate": "30-05-2022",
    "createdUser": "Thắng xe ôm",
    "status": "In Warehouse ",
  },
  {
    "key": "4fbe3948-d943-45b9-a95b-580c52e54d01",
    "ticketID": "4fbe3948-d943-45b9-a95b-580c52e54d01",
    "ticketName": "Phiếu 2",
    "description": "Phiếu thu 2 được tạo ngày 30-5",
    "createdDate": "30-05-2022",
    "createdUser": "Thắng xe ôm",
    "status": "In Warehouse ",
  },
];
const defaultExpandable = {
  expandedRowRender: (record) => <Space direction="horizonal" size="middle" style={{ display: 'grid', gridTemplateColumns : "1fr 1fr 1fr" }}>
                                    
                                </Space>,
};
const TableWaitingForExport = () => {
    const [data,setData] = useState([]);
    const [SelectedData, setSelectedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasData, setHasData] = useState(true);
    const successMessage = () => {
        message.success("Nhập kho thành công")
    } 
    const failMessage = () => {
        message.error("Nhập kho thất bại")
    } 

    const defaultTitle = () => <Space direction="horizonal" style={{display : 'flex', justifyContent : 'space-between', padding : '.8rem', fontWeight : 'bold',}}>
                                    <p>Kho: </p>
                                </Space>;

  const HandleSetSelectedData = (e)=>{
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
  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={tableColumns}
        dataSource={hasData ? exportLists : []}
        scroll={{y : 700}}
      />
    </>
  );
};
export default TableWaitingForExport;