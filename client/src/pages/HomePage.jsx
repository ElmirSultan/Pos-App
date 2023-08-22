import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import { Spin } from "antd";

const HomePage = () => {
    const [categories, setCategories] = useState()
    const [filtered, setFiltered] = useState([])
    const [products, setProducts] = useState();
    const [search, setSearch] = useState("");

    // temporary
    // const mockiliProducts =  
    const [mockProducts, setMockProducts] = useState([]);



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

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all")
                const data = await res.json()
                data && setCategories(data.map((item) => {
                    return { ...item, value: item.title }
                }))
            } catch (error) {
                console.log(error);
            }
        }

        getCategories()
    }, [])

    return (
        <>
            <Header products={products} setSearch={setSearch} search={search} mockProducts={mockProducts} setMockProducts={setMockProducts} />
            {
                products && categories ? (
                    <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24">
                        <div className="categories max-h-[calc(100vh_-_112px)] overflow-auto md:pb-10 ">
                            <Categories setFiltered={setFiltered} categories={categories} setCategories={setCategories} products={products} />
                        </div>
                        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10">
                            <Products
                                filtered={filtered}
                                categories={categories}
                                products={products}
                                setProducts={setProducts}
                                search={search} />
                        </div>
                        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border ">
                            <CartTotals />
                        </div>
                    </div>
                ) : <Spin size="large" className="absolute w-screen h-screen flex items-center justify-center" />
            }
        </>
    )
}

export default HomePage