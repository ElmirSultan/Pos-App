import Header from "../components/Header/Header"
import StatisticCard from "../components/statistic/StatisticCard"
import { useState,useEffect } from "react";
const Statistics = () => {
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("posUser"));


    useEffect(() => {
      asyncFetch();
    }, []);

    useEffect(() => {
      const getProducts = async () => {
          try {
              const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all")
              const data = await res.json()
              console.log(data);
              setProducts(data)
          } catch (error) {
              console.log(error);
          }
      }

      getProducts()
  }, [])

    const asyncFetch = () => {
        fetch('http://localhost:5000/api/bills/get-all')
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => {
            console.log('fetch data failed', error);
          });
      };


      const totalAmount = () => {
        // dongu 
        const amount = data.reduce((total,item) => item.totalAmount + total,0)
        return `${amount.toFixed(2)} $`
      }

    return (
        <>
            <Header />
            <div className="px-6 md:pb-10 pb-20">
                <h1 className="text-4xl font-bold text-center mb-4">Statistics</h1>
                <div className="statistic-section">
                    <h2 className="text-lg">Welcome <span 
                    className="text-green-600
                    font-bold text-xl">{user.username}</span></h2>
                    <div className="statistic-card grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">

                    <StatisticCard title={"Total Customers"} amount={data?.length} pic={"https://www.freeiconspng.com/thumbs/customers-icon/customers-icon-3.png"} /> 
                    <StatisticCard title={"Total Earnings"} amount={totalAmount()} pic={"https://img.lovepik.com/free-png/20210918/lovepik-money-png-image_400249986_wh1200.png"}/> 
                    <StatisticCard title={"Total Sales"} amount={data?.length} pic={"https://media.istockphoto.com/id/1138452186/vector/full-total-sale-icon.jpg?s=612x612&w=0&k=20&c=jQShnjNFC9xlC-cZlnWe5cyBalV5p80Hy9D-4N66Ow8="} /> 
                    <StatisticCard title={"Total Products"} amount={products?.length} pic={"https://png.pngtree.com/element_our/sm/20180626/sm_5b321ca31dc13.jpg"}/> 

                    </div>
             
                </div>
            </div>
        </>
    )
}

export default Statistics