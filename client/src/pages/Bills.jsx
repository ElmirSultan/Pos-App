import { Button, Table} from "antd"
import { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import Printbill from "../components/bills/Printbill"
const Bills = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billItems,setBillItems] = useState()
    const [customer,setCustomer] = useState()
console.log(customer);
    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Phone number',
            dataIndex: 'customerPhoneNumber',
            key: 'customerPhoneNumber',
        },
        {
            title: 'Creation Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text)=>{
                return <span>{text.substring(0,10)}</span>
            }
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMode',
            key: 'paymentMode',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text)=>{
                return <span>{text}$</span>
            }
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_,record)=>{
                return <Button type="link" className="pl-0" 
                onClick={() => {
                    setIsModalOpen(true)
                    setCustomer(record)
                }}>Print</Button>
            }
        },
    ];

    

  
  


    useEffect(() => {
        const getBills = async () => {
            try{
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all")
                const data = await res.json();
                setBillItems(data)
            }
            catch(error){

            }
        };
        getBills()
    }, [])
    console.log(billItems);
    return (
        <>
            <Header />
            <div className="px-6">
                <h1 className="text-4xl font-bold text-center mb-4">Bills</h1>
                <Table bordered
                     pagination={false}
                    dataSource={billItems}
                    columns={columns}
                    scroll={{
                        x:1000,
                        y:300
                    }}
                    rowKey={"_id"} />;
       
            </div>
            <Printbill isModalOpen={isModalOpen} 
            setIsModalOpen={setIsModalOpen}
            customer = {customer}  />
        </>
    )
}

export default Bills