import { Card, DatePicker, Space , Divider, Avatar, Descriptions,List,Tabs,Input,Badge,Button } from 'antd';
// import { Button } from 'antd/lib/radio';
import { useState,useEffect } from 'react';
import {CloseOutlined} from '@ant-design/icons';
const {TextArea} = Input;
const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

const warehouses = [
    {
        id : '717bac81-c67a-4abc-8bf5-aa0b8664b117',
        code: 'WH01',
        name:'Kho 1',
        location : 'Quận 1, Hồ Chí Minh',
        countrycode: '1',
        provincecode: '1',
        districtcode: '1',
        wardcode: '1',
    },
    {
        id : '6206afb7-f3b0-4ec5-840e-2a535c04ecce',
        code: 'WH02',
        name:'Kho 2',
        location : 'Quận 2, Hồ Chí Minh',
        countrycode: '2',
        provincecode: '2',
        districtcode: '2',
        wardcode: '2',
    },
    {
        id : '0a30b5fb-1c75-4e87-8e73-a39c1d17ba21',
        code: 'WH03',
        name:'Kho 3',
        location : 'Quận 3, Hồ Chí Minh',
        countrycode: '3',
        provincecode: '3',
        districtcode: '3',
        wardcode: '3',
    },
    {
        id : 'cde45808-2686-47bb-b01c-75ed3d892182',
        code: 'WH04',
        name:'Kho 4',
        location : 'Quận 4, Hồ Chí Minh',
        countrycode: '4',
        provincecode: '4',
        districtcode: '4',
        wardcode: '4',
    },
    {
        id : 'f76b0ffb-049b-4e54-9ffc-99680bed536a',
        code: 'WH05',
        name:'Kho 5',
        location : 'Quận 5, Hồ Chí Minh',
        countrycode: '5',
        provincecode: '5',
        districtcode: '5',
        wardcode: '5',
    }
];
// const orders = [
//     {
//         "key": "4fbe3948-d943-45b9-a95b-580c52e54d00",
//         "id": "4fbe3948-d943-45b9-a95b-580c52e54d00",
//         "shipno": "IUTTGVET1",
//         "dropofftype": "1",
//         "servicetype": "1",
//         "ordercode": "IUTTGVET",
//         "shippingchargespayment": "Sender",
//         "deliverystatus": "PICKUP_WAITING",
//         "timeregister": "5/19/2022 3:45:51 PM",
//         "sendername": "Thành vip pro",
//         "senderphone": "0123456789",
//         "senderaddress": "thu duc, vn",
//         "sendercountrycode": "VN",
//         "sendercitycode": "VN-SG",
//         "senderdistrictcode": "71010",
//         "senderwardcode": "71020",
//         "senderpostalcode": "71000",
//         "receivername": "test3",
//         "receiverphone": "0987654321",
//         "receiveraddress": "hanoi, vn",
//         "receivercountrycode": "VN",
//         "receivercitycode": "VN-HN",
//         "receiverdistrictcode": "Cầu Giấy",
//         "receiverwardcode": "1",
//         "receiverpostalcode": "100000",
//         "totalpackages": 2,
//         "servicepostage": 1,
//         "addedpostage": 1,
//         "codpostage": 1,
//         "surcharge": 1,
//         "totalpostage": 1,
//         "vat": 1,
//         "weight": 12,
//         "cod": 300,
//         "currency": "VND",
//         "content": null,
//         "note": null,
//         "warehouse": "WH01"
//     },
//     {
//         "key": "47fb9e2a-840f-4444-b730-24ddb31cddca",
//         "id": "47fb9e2a-840f-4444-b730-24ddb31cddca",
//         "shipno": "EGDUIEEH1",
//         "dropofftype": "1",
//         "servicetype": "1",
//         "ordercode": "EGDUIEEH",
//         "shippingchargespayment": "Sender",
//         "deliverystatus": "PICKUP_WAITING",
//         "timeregister": "5/19/2022 4:15:14 PM",
//         "sendername": "Thắng ",
//         "senderphone": "0747852369",
//         "senderaddress": "01/01",
//         "sendercountrycode": "VN",
//         "sendercitycode": "VN-SG",
//         "senderdistrictcode": "71010",
//         "senderwardcode": "P3",
//         "senderpostalcode": "700000",
//         "receivername": "Thành ",
//         "receiverphone": "0926985147",
//         "receiveraddress": "02/01",
//         "receivercountrycode": "VN",
//         "receivercitycode": "VN-HN",
//         "receiverdistrictcode": "Cầu Giấy",
//         "receiverwardcode": "P3",
//         "receiverpostalcode": "100000",
//         "totalpackages": 1,
//         "servicepostage": 1,
//         "addedpostage": 1,
//         "codpostage": 1,
//         "surcharge": 1,
//         "totalpostage": 1,
//         "vat": 1,
//         "weight": 65,
//         "cod": 10,
//         "currency": "VND",
//         "content": null,
//         "note": null,
//         "warehouse": "WH01"
//     }
//   ];  


const FormChosenWareHouse = (props) => {
    const {getSelectedData, deleteData, onCancel} = props;
    const dataSelected = getSelectedData();
    const [DataCreateTranferExport, SetdataCreateTranferExport] = useState(
    {
        ImportList : {
            Name : "",
            Description : "",
            Import_To : "",
            Export_Date: "",
        },
        IDOrderShippings : dataSelected.map(x=>x.ID)
    }
    )   
    console.log(DataCreateTranferExport)
    const HandleClose = () => {
        // SetdataCreateChosenWareHouse({
        //     Receipts : {
        //     Name : "",
        //     Description : "",
        //     RangeDate : "",
        //     Type : "ChosenWareHouseRECEIPT" ,
        //     },
        // });
        // SetChosenWareHouse(null)
    }
    // const RefeshHandleClose = () => {
    //     SetdataCreateChosenWareHouse({
    //         Receipts : {
    //         Name : "",
    //         Description : "",
    //         RangeDate : "",
    //         Type : "ChosenWareHouseRECEIPT" ,
    //         },
    //     });
    //     SetChosenWareHouse(null)
    //     // onCancel();
    // }
    const OnTypingData = (e) => {

        SetdataCreateTranferExport(prevState =>({
            ...prevState,
            ImportList : {
                ...prevState.ImportList,
                [e.target.name] : e.target.value
            }
        }))
    }
    const OnSelectDateChange = (e) => {
        // console.log(e.format("MM-DD-YYYY"))
        SetdataCreateTranferExport(prevState =>({
            ...prevState,
            ImportList : {
                ...prevState.ImportList,
                Export_Date : e.format("MM-DD-YYYY")
            }
        }))
    }
    // console.log(DataCreateChosenWareHouse);
    const [ChosenWareHouse,SetChosenWareHouse] = useState(null);
    const HandleChosenWareHouse = (e) => {
        SetChosenWareHouse(e)
        SetdataCreateTranferExport(prevState =>({
            ...prevState,
            ImportList : {
                ...prevState.ImportList,
                Import_To : e.code
            }
        }))
    }
    // Khi data null thi close Modal
    useEffect(()=>{
        if(dataSelected.length <= 0)
        {
            HandleClose()
            onCancel()
        }
    },[dataSelected.length ===0])

    return (
    <>
    <Space
        direction="horizonal"
        size="middle"
        style={{
        display: 'grid',
        gridTemplateColumns : '1.5fr 2.2fr 1.5fr'
        }}
    >
        <Card style={{ height : '100%'}}>
            <p style ={{fontSize:'18px',fontWeight:'700'}}>Chọn kho</p>
            <Divider orientation="left">Danh sách kho</Divider>
            <List
                style={{height : '266px', overflow : 'auto'}}
                itemLayout="horizontal"
                dataSource={warehouses}
                renderItem={(warehouses) => (
                    <List.Item onClick={()=> HandleChosenWareHouse(warehouses)} style={{cursor: "pointer", backgroundColor : ChosenWareHouse  && warehouses.id === ChosenWareHouse.id ? '#e6f7ff' : null}} >
                        <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<a href="https://ant.design">{warehouses.name}</a>}
                        description={warehouses.location}
                        />
                    </List.Item>
                )}                
            />     
        </Card>
        {/* <Divider type="vertical" style={{height : '100%'}}/> */}
        <Tabs defaultActiveKey="1" >
            <TabPane tab="Thông tin phiếu xuất kho" key="1">
            <Space direction="vertical">
                <Space direction="horizonal">
                    <Input value = {DataCreateTranferExport.ImportList.Name} name='Name' addonBefore="Tên phiếu: " onChange={OnTypingData}  />
                    <Input readOnly value = {ChosenWareHouse ? ChosenWareHouse.code : ""} name='Import_To' addonBefore="Kho đến: " onChange={OnTypingData} />
                </Space>
                    <DatePicker name= 'Export_Date' onChange={OnSelectDateChange} style={{width : '50%'}} placeholder="Chọn ngày xuất"/>
                <Divider orientation="left">Mô tả</Divider>
                <TextArea value = {DataCreateTranferExport.ImportList.Description} name='Description' rows={5} placeholder="Description" onChange={OnTypingData} />
            </Space>
            </TabPane>
            <TabPane tab = {<Badge style={{marginTop : '-5px'}} count={ChosenWareHouse ? ChosenWareHouse.name : ""} color="cyan">Thông tin kho xuất tới</Badge>} key="2">
                <Card size="middle">
                    <Space
                        direction="horizonal"
                        size="middle"
                        style={{
                        display: 'block',
                        }}
                    > 
                        {
                            ChosenWareHouse ? 
                            <>
                            <div style={{display: 'flex', justifyContent : 'center',}}>
                                <Avatar src="https://joeschmoe.io/api/v1/random"
                                    size={{ xs: 24, sm: 32, md: 70, lg: 64, xl: 80, xxl: 100 }}
                                    //icon={<AntDesignOutlined />}
                                />
                            </div>
                            <Divider type="horizonal" style={{height : '100%'}}/>
                            <Descriptions  column={4}>
                                <Descriptions.Item  span={4} label="Tên">{ChosenWareHouse.name ? ChosenWareHouse.name  : "Empty"}</Descriptions.Item>
                                <Descriptions.Item  span={4} label="Vị trí">{ChosenWareHouse.location ?  ChosenWareHouse.location : "Empty" }</Descriptions.Item>
                                <Descriptions.Item  span={2} label="Mã quốc gia">{ChosenWareHouse.countrycode ? ChosenWareHouse.countrycode : "Empty"}</Descriptions.Item>
                                <Descriptions.Item  span={2} label="Mã tỉnh">{ChosenWareHouse.provincecode ? ChosenWareHouse.provincecode  : "Empty"}</Descriptions.Item>
                                <Descriptions.Item  span={2} label="Mã quận">{ChosenWareHouse.districtcode ? ChosenWareHouse.districtcode  : "Empty"}</Descriptions.Item>
                                <Descriptions.Item  span={2} label="Mã phường">{ChosenWareHouse.wardcode ? ChosenWareHouse.wardcode  : "Empty"}</Descriptions.Item>
                            </Descriptions> </>
                            : null
                        }
                    </Space>
                    <Space
                        direction="horizonal"
                        size="middle"
                        style={{
                        display: 'flex',
                        }}
                    > 
                    </Space>
                </Card>
            </TabPane>
        </Tabs>
        <Card style={{ height : '100%'}}>
            <Divider orientation="left">Danh sách đơn</Divider>
            <div style={{display: 'flex',justifyContent : 'flex-end',}}>
                <Button type="primary">Thêm đơn</Button>
            </div>
                    <List
                        style={{height : '266px', overflow : 'auto'}}
                        itemLayout="horizontal"
                        dataSource={dataSelected}
                        renderItem={(orders) => (
                            <List.Item>
                                <List.Item.Meta 
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a>{orders.ORDERCODE}</a>}
                                description={orders.SENDERPHONE}
                                />                 
                                    <CloseOutlined onClick={() =>
                                        deleteData(orders)} style ={{fontSize:'20px'}}
                                    />
                            </List.Item>
                            
                        )}                
                    />
        </Card>
    </Space>
    <Space direction="horizonal"
        size="middle"
        style={{
            display: 'flex' ,
            justifyContent : 'flex-end',
            columnGap : '.8rem'
        }}
    >
        <Button onClick={()=>{HandleClose(); }}>Làm mới</Button>
        <Button onClick={()=>{}}>Xuất kho</Button>
    </Space>
    </>
    );
}

export default FormChosenWareHouse;