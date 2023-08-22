import { Button, Modal } from "antd"
import { useRef } from "react"
import {useReactToPrint} from "react-to-print"

const Printbill = ({ isModalOpen, setIsModalOpen, customer }) => {
    // print islemi uchun
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: ()=> componentRef.current
    })
    return (
        <div>
            <Modal title="Print Invoice"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={false}
                width={800}>
                <section className="py-20 bg-black" ref={componentRef}>
                    <div className="max-w-5xl mx-auto bg-white px-6">
                        <article className="overflow-hidden">
                            <div className="logo">
                                <h2 className="text-4xl font-bold text-slate-700 my-6">LOGO</h2>
                            </div>
                            <div className="bill-details">
                                <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                                    <div className="text-md text-slate-500">
                                        <p className="font-bold">Bills Details: </p>
                                        <p className="font-bold text-blue">{customer?.customerName}</p>
                                        <p>Fake Street 123</p>
                                        <p>San Javier</p>
                                        <p>CA 1234</p>
                                    </div>

                                    <div className="text-md text-slate-500">
                                        <p className="font-bold">Bill: </p>
                                        <p>the Boring Company</p>
                                        <p>Tesla Street 007</p>
                                        <p>Frisco</p>
                                        <p>CA 0000</p>
                                    </div>

                                    <div className="text-md text-slate-500">
                                        <div>
                                            <p className="font-bold">Bills Number: </p>
                                            <p>000{Math.floor(Math.random() * 100)}</p>
                                        </div>

                                        <div className="mt-2">
                                            <p className="font-bold">Date of Time: </p>
                                            <p>{customer?.createdAt.substring(0, 10)}</p>
                                        </div>
                                    </div>

                                    <div className="text-md text-slate-500 sm:block hidden">
                                        <div>
                                            <p className="font-bold">Terms: </p>
                                            <p>10 days</p>
                                        </div>

                                        <div className="mt-2">
                                            <p className="font-bold">Due: </p>
                                            <p>2023-06-16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bill-table-area mt-8">
                                <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0
                                            sm:table-cell hidden">Image</th>

                                            <th scope="col" className="py-3.5 w-full  text-left text-sm font-normal text-slate-700 md:pl-0">
                                                Content
                                            </th>

                                            <th scope="col" className="py-3.5 text-center text-sm font-normal text-slate-700  md:pl-0
                                            sm:table-cell hidden">Price</th>

                                            <th scope="col" className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0
                                            sm:table-cell hidden">Count</th>

                                            <th scope="col" className="py-3.5 text-end text-sm font-normal text-slate-700  md:pl-0">Total</th>
                                        </tr>
                                    </thead>



                                    <tfoot>
                                        <tr>
                                            <th className="text-right pt-4 sm:table-cell hidden pr-4" colSpan="4" scope="row">
                                                <span className="font-normal text-slate-700">Subtotal</span>
                                            </th>
                                            <th className="text-left pt-4 sm:hidden" scope="row">
                                                <p className="font-normal text-slate-700">Subtotal</p>
                                            </th>
                                            <th className="text-right pt-4" scope="row">
                                            <span className="font-normal text-slate-700">{customer?.subTotal}₺</span>
                                            </th>
                                        </tr>

                                        <tr>
                                            <th className="text-right pt-4 sm:table-cell hidden pr-4" colSpan="4" scope="row">
                                                <span className="font-normal text-slate-700">TAX</span>
                                            </th>
                                            <th className="text-left pt-4 sm:hidden" scope="row">
                                                <p className="font-normal text-slate-700">TAX</p>
                                            </th>
                                            <th className="text-right pt-4" scope="row">
                                            <span className="font-normal text-red-600">+{customer?.tax}₺</span>
                                            </th>
                                        </tr>

                                        <tr>
                                            <th className="text-right pt-4 sm:table-cell hidden pr-4" colSpan="4" scope="row">
                                                <span className="font-normal text-slate-700">Total</span>
                                            </th>
                                            <th className="text-left pt-4 sm:hidden" scope="row">
                                                <p className="font-normal text-slate-700">Total</p>
                                            </th>
                                            <th className="text-right pt-4" scope="row">
                                                <span className="font-normal text-slate-700">{customer?.totalAmount}</span>
                                            </th>
                                        </tr>
                                    </tfoot>
                                </table>

                                <div className="border-t pt-9 border-slate-200 pb-5">
                                    <p className="text-sm font-light text-slate-700">Hi...</p>
                                </div>
                            </div>
                        </article>

                    </div>
                </section>

                <div className="flex justify-end p-2">
                    <Button type="primary" size="large" onClick={handlePrint}>Print</Button>

                </div>
            </Modal>
        </div>
    )
}

export default Printbill