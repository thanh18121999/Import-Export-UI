import { Card, Space , Divider, Avatar, Descriptions,List,Tabs,Input,Badge } from 'antd';
import { Button } from 'antd/lib/radio';
import { useState } from 'react';
const {TextArea} = Input;
const {TabPane} = Tabs;

const FormConfirmImport = (props) => {
    const [DataCreateConfirmImport, SetdataCreateConfirmImport] = useState({
        Receipts : {
            Name : "",
            CreatedDate : "",
            Description : "",
            Type : "CONFIRMIMPORTRECEIPT" ,
        },
    })   
    const HandleClose = () => {
        SetdataCreateConfirmImport({
            Receipts : {
            Name : "",
            CreatedDate : "",
            Description : "",
            Type : "CONFIRMIMPORTRECEIPT" ,
            },
        });
        SetConfirmImport(null)
    }
    const OnTypingData = (e) => {
        SetdataCreateConfirmImport(prevState =>({
            ...prevState,
            Receipts : {
                ...prevState.Receipts,
                [e.target.name] : e.target.value
            }
        }))
    }
    console.log(SetdataCreateConfirmImport);
    const [ConfirmImport,SetConfirmImport] = useState(null);
    return (
    <>
    <Space
        direction="horizonal"
        size="middle"
        style={{
        display: 'grid',
        gridTemplateColumns : '1fr auto 2.2fr'
        }}
    >
        <Card style={{ height : '100%'}}>
            <Divider orientation="left">Danh sách đơn hàng</Divider>
        </Card>
        <Divider type="vertical" style={{height : '100%'}}/>
        <Tabs defaultActiveKey="1" >
            <TabPane tab="Thông tin phiếu nhập kho" key="1">
            <Space direction="vertical">
                <Space direction="horizonal">
                    <Input value = {DataCreateConfirmImport.Receipts.Name} name='Name' addonBefore="Tên phiếu " onChange={OnTypingData}  />
                    <Input value = {DataCreateConfirmImport.Receipts.CreatedDate} name='Name' addonBefore="Ngày tạo " onChange={OnTypingData}  />
                </Space>
                <Divider orientation="left">Mô tả</Divider>
                <TextArea value = {DataCreateConfirmImport.Receipts.Description} name='Description' rows={5} placeholder="Description" onChange={OnTypingData} />
            </Space>
            </TabPane>
            <TabPane tab = {<Badge style={{marginTop : '-5px'}} count={ConfirmImport ? ConfirmImport.name : ""} color="cyan">Thông tin đơn hàng</Badge>} key="2">
                <Card size="middle">
                    <Space
                        direction="horizonal"
                        size="middle"
                        style={{
                        display: 'flex',
                        }}
                    > 
                        {
                            ConfirmImport ? 
                            <>
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 70, lg: 64, xl: 80, xxl: 100 }}
                                //icon={<AntDesignOutlined />}
                            />
                            <Divider type="vertical" style={{height : '100%'}}/>
                            <Descriptions  column={4}>
                                
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
    </Space>
    <Space direction="horizonal"
        size="middle"
        style={{
            display: 'flex' ,
            justifyContent : 'flex-end',
            columnGap : '.8rem'
        }}
    > 
        <Button onClick={HandleClose}>Làm mới</Button>
        <Button type="primary" >Xác nhận nhập kho</Button>
    </Space>
    </>
    );
}

export default FormConfirmImport;