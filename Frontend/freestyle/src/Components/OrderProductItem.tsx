import { useState } from "react";
import menUnderWearImg from "../Images/Categories/menunderwear.jpg"
import { OrderProduct } from "../Services/Interfaces";

interface Props{
    orderProduct: OrderProduct;
}

function OrderProductItem({orderProduct}:Props) {
    return (
        <div className="container-fluid px-5 mt-3">

            <div className="row">
                <div className="col-1">
                    <img src={menUnderWearImg} className="img-fluid rounded img-size" />
                </div>
                <div className="col-8">
                    <div><strong>{orderProduct.product.title}</strong></div>
                    <div>{orderProduct.product.subtitle}</div>
                    <div></div>
                </div>
                <div className="col-3">
                    <div className="d-flex justify-content-end">
                        {orderProduct.product.price}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderProductItem;