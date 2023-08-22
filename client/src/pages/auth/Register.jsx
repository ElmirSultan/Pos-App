import { Button, Form, Input, Carousel, message } from 'antd'
import { Link, useNavigate } from "react-router-dom"
import AuthCarousel from './AuthCarousel'
import StatsImg from "../../svg/stats.svg"
import CustomerImg from "../../svg/customer.svg"
import ResponsiveImg from "../../svg/responsive.svg"
import AdminImg from "../../svg/admin.svg"
import { useState } from 'react'
const Register = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const onFinish = async (values) => {
        setLoading(true)
        try {
           const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register",{
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            if(res.status === 200){
                message.success("Register is completed successfully")
                navigate("/login")
                setLoading(false)
            }
        } catch (error) {
            message.error("Something went wrong")
            console.log(error);
        }
    }
    return (
        <div className='h-screen'>
            <div className='flex justify-between h-full'>
                <div className='xl:px-20 px-10 w-full flex flex-col h-full justify-center relative'>
                    <h1 className='text-center text-5xl font-bold mb-2'>LOGO</h1>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item label="Username" name={"userName"} rules={[{ required: true, message: "You Should Fill Username Blank" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="E-mail" name={"email"} rules={[{ required: true, message: "You Should Write Your E-mail" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Password" name={"password"} rules={[{ required: true, message: "Write Your Password" }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item label="Password" 
                        name={"passwordAgain"}
                        dependencies={["password"]} 
                        rules={[
                            { 
                                required: true, 
                                message: "Write Your Password Correctly!" 
                            },
                            ({getFieldValue}) => ({
                                validator(_,value) {
                                    if(!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("The two passwords that you entered do not match!"))
                                },
                            }),
                            ]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button loading={loading}
                            type='primary' 
                            htmlType='submit' 
                            size='large' 
                            className='w-full'>Register</Button>
                        </Form.Item>
                    </Form>
                    <p className='text-xl flex justify-center absolute left-0 bottom-10 w-full'>
                        Do You Have an Account? &nbsp;
                        <Link
                            to={"/login"}
                            className='text-blue-600'>Log In</Link></p>
                </div>
                <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
                    <div className="w-full h-full flex items-center">
                        <div className="w-full">
                            <Carousel className="!h-full px-6" autoplay>
                                <AuthCarousel
                                    img={ResponsiveImg}
                                    title="Responsive"
                                    desc="Compatibility with All Device Sizes"
                                />
                                <AuthCarousel
                                    img={StatsImg}
                                    title="Statistics"
                                    desc="Broad Statistics"
                                />
                                <AuthCarousel
                                    img={CustomerImg}
                                    title="Customer Satisfaction"
                                    desc="Satisfied customers with the product at the end of the experience"
                                />
                                <AuthCarousel
                                    img={AdminImg}
                                    title="Admin Panel"
                                    desc="One Place Management"
                                />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register