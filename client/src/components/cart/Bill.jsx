import { Form, Input, Modal, Select, Card, Button, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";
const Bill = ({ isModalOpen, setIsModalOpen }) => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
          const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
            method: "POST",
            body: JSON.stringify({
              ...values,
              subTotal: cart.total,
              tax: ((cart.total * cart.tax) / 100).toFixed(2),
              totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
              cartItems: cart.cartItems,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });
    
          if (res.status === 200) {
            message.success("Order is successfully created");
            dispatch(reset());
            navigate("/bills");
          }
        } catch (error) {
          message.danger("Something went wrong");
          console.log(error);
        }
      };

    return (
        <div>
            <Modal
                title="Create a bill"
                open={isModalOpen}
                footer={false}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form layout={"vertical"} onFinish={onFinish}>
                    <Form.Item
                        label="Customer Name"
                        name={"customerName"}
                        rules={[{ required: true, message: "You Should Write Customer Name" }]}>
                        <Input placeholder="Write Customer name" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        rules={[{ required: true, message: "Phone Number must be included" }]}
                        name={"customerPhoneNumber"} >
                        <Input placeholder="Write phone number" maxLength={10} />
                    </Form.Item>

                    <Form.Item
                        label="Payment Method"
                        rules={[{ required: true, message: "Payment Method is required" }]}
                        name={"paymentMode"}>
                        <Select placeholder="Choose your payment method">
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="credit cart">Credit Card</Select.Option>
                        </Select>
                    </Form.Item>

                    <Card>
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{(cart.total).toFixed(2)}$</span>
                        </div>

                        <div className="flex justify-between">
                            <span>VAT %{cart.tax}</span>
                            <span className="text-red-600">+{((cart.total * cart.tax) / 100).toFixed(2)}$</span>
                        </div>

                        <div className="flex justify-between">
                            <b>Total</b>
                            <b> {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}$</b>
                        </div>

                        <Button
                            className="mt-4"
                            type="primary"
                            onClick={() => setIsModalOpen(true)}
                            htmlType="submit"
                            disabled={cart.cartItems.length === 0}
                        >
                            Create Order
                        </Button>

                    </Card>

                </Form>
            </Modal>
        </div>
    )
}

export default Bill