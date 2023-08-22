import {Table} from "antd"
import Header from "../components/Header/Header"
import { useEffect, useState } from "react";
const Customers = () => {
    const [billItems,setBillItems] = useState()

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


  

    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Phone Number',
            dataIndex: 'customerPhoneNumber',
            key: 'customerPhoneNumber',
        },
        {
            title: 'Transaction Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text)=> {
                return <span>{text.substring(0,10)}</span>
            }
        },
    ];


    return (
        <>
            <Header />
            <div className="px-6">
                <h1 className="text-4xl font-bold text-center mb-4">Customers</h1>
                <Table bordered pagination={false}
                    dataSource={billItems}
                    columns={columns}
                    scroll={{
                        x:1000,
                        y:300
                    }}
                    rowKey={"_id"}  />;

            </div>
        </>
    )
}

export default Customers