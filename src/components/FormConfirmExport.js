import { Card, DatePicker, Space, Divider, Avatar, Descriptions, List, Tabs, Input, Badge, Button } from 'antd';
import { useState, useEffect} from 'react';
import { DeleteOutlined } from '@ant-design/icons';
//import TableInWarehouse from './TableInWarehouse';
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
        name:'Kho 4',
        location : 'Quận 4, Hồ Chí Minh',
        countrycode: '4',
        provincecode: '4',
        districtcode: '4',
        wardcode: '4',
    },
    {
        id : 'f76b0ffb-049b-4e54-9ffc-99680bed536a',
        name:'Kho 5',
        location : 'Quận 5, Hồ Chí Minh',
        countrycode: '5',
        provincecode: '5',
        districtcode: '5',
        wardcode: '5',
    }
]; 

const OnSelectDateChange = (e) => {
    console.log(e[0].format("MM-DD-YYYY"))
}
const FormConfirmExport = (props) => {
    const {getSelectedData, onCancel, deleteData} = props;
    const dataSelected = getSelectedData()
    const [DataCreateConfirmExport, SetdataCreateConfirmExport] = useState({
        Receipts : {
            Name : "",
            Description : "",
            RangeDate : "",
            Type : "CONFIRMEXPORTRECEIPT" ,
        },
    })   
    const HandleClose = () => {
        SetdataCreateConfirmExport({
            Receipts : {
            Name : "",
            Description : "",
            RangeDate : "",
            Type : "CONFIRMEXPORTRECEIPT" ,
            },
        });
        SetConfirmExport(null)
        onCancel();
    }
    const OnTypingData = (e) => {
        SetdataCreateConfirmExport(prevState =>({
            ...prevState,
            Receipts : {
                ...prevState.Receipts,
                [e.target.name] : e.target.value
            }
        }))
    }
    //console.log(DataCreateConfirmExport);
    const [ConfirmExport,SetConfirmExport] = useState(null);

    
    useEffect(()=>{
        if(dataSelected.length <= 0)
        {
            HandleClose()
        }
    },[dataSelected.length])

    return (
    <>
    <Space
        direction="horizonal"
        size="middle"
        style={{
        display: 'grid',
        gridTemplateColumns : '3fr 0.5fr 5fr 3fr'
        }}
    >
        <Card style={{ height : '100%'}}>
            <Divider orientation="left">Chọn kho đến</Divider>
            <Divider>Danh sách kho</Divider>
            <List
                style={{height : '266px', overflow : 'auto'}}
                itemLayout="horizontal"
                dataSource={warehouses}
                renderItem={(warehouses) => (
                    <List.Item onClick={()=> SetConfirmExport(warehouses)} style={{cursor: "pointer", backgroundColor : ConfirmExport  && warehouses.id === ConfirmExport.id ? '#e6f7ff' : null}} >
                        <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<a href="https://ant.design">{warehouses.name}</a>}
                        description={warehouses.location}
                        />
                    </List.Item>
                )}                
            />     
        </Card>
        <Divider type="vertical" style={{height : '100%'}}/>
        <Tabs defaultActiveKey="1" >
            <TabPane tab="Thông tin phiếu xuất kho" key="1">
            <Space direction="vertical">
                <Space direction="horizonal">
                    <Input value = {DataCreateConfirmExport.Receipts.Name} name='Name' addonBefore="Tên phiếu: " onChange={OnTypingData}  />
                    <Input value = {ConfirmExport ? ConfirmExport.name : ""} name='Name' addonBefore="Kho đến: "  />
                </Space>
                <RangePicker name="RangeDate" onChange={OnSelectDateChange} style={{width : '100%'}} />
                <Divider orientation="left">Mô tả</Divider>
                <TextArea value = {DataCreateConfirmExport.Receipts.Description} name='Description' rows={5} placeholder="Description" onChange={OnTypingData} />
            </Space>
            </TabPane>
            <TabPane tab = {<Badge style={{marginTop : '-5px'}} count={ConfirmExport ? ConfirmExport.name : ""} color="cyan">Thông tin kho xuất tới</Badge>} key="2">
                <Card size="middle">
                    <Space
                        direction="horizonal"
                        size="middle"
                        style={{
                        display: 'inline',
                        textAlign: 'center'
                        }}
                    > 
                        {
                            ConfirmExport ? 
                            <>
                            <Avatar src="https://joeschmoe.io/api/v1/random"
                                size={{ xs: 24, sm: 32, md: 70, lg: 64, xl: 80, xxl: 100 }}
                                //icon={<AntDesignOutlined />}
                            />
                            <Divider type="vertical" style={{height : '100%'}}/>
                            <Descriptions  column={4}>
                                <Descriptions.Item  span={4} label="Tên">{ConfirmExport.name ? ConfirmExport.name  : "Empty"}</Descriptions.Item>
                                <Descriptions.Item  span={4} label="Vị trí">{ConfirmExport.location ?  ConfirmExport.location : "Empty" }</Descriptions.Item>
                                <Descriptions.Item  span={2} label="Mã quốc gia">{ConfirmExport.countrycode ? ConfirmExport.countrycode : "Empty"}</Descriptions.Item>
                                <Descriptions.Item  span={2} label="Mã tỉnh">{ConfirmExport.provincecode ? ConfirmExport.provincecode  : "Empty"}</Descriptions.Item>
                                <Descriptions.Item  span={2} label="Mã quận">{ConfirmExport.districtcode ? ConfirmExport.districtcode  : "Empty"}</Descriptions.Item>
                                <Descriptions.Item  span={2} label="Mã phường">{ConfirmExport.wardcode ? ConfirmExport.wardcode  : "Empty"}</Descriptions.Item>
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
            <Divider>Danh sách đơn</Divider>
            <List
                itemLayout='horizontal'
                dataSource={dataSelected}
                renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                title= {item.ordercode}
                description= {item.receiverphone}
                />
                <Button onClick={() => deleteData(item)} >
                <DeleteOutlined />
                </Button>
            </List.Item>
            )}        
            />

            <Space direction="horizonal"
                size="middle"
                style={{
                    display: 'flex' ,
                    justifyContent : 'flex-end',
                    columnGap : '.8rem',
                    marginTop: '2rem'
                }}
            >
                {/* <Button onClick={HandleClose}>Huỷ bỏ</Button>
                <Button type="primary" >Xác nhận</Button> */}
            </Space>     
        </Card>

    </Space>
    <Space direction="horizonal"
        size="middle"
        style={{
            display: 'flex' ,
            justifyContent : 'flex-end',
            columnGap : '.8rem',
            marginTop: '1rem'
        }}
    >
        <Button onClick={HandleClose}>Làm mới</Button>
        <Button type="primary" >Xuất kho</Button>
    </Space>
    </>
    );
}

export default FormConfirmExport;