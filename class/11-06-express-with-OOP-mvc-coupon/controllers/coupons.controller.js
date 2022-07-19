import { CashService } from "./services/cash.js"

export class CouponController{
    buyCoupon = (req,res) => {
        const cashService = new CashService()
        const hasMoney = cashService.checkValue()
        if(hasMoney){
            res.send("쿠폰 구매 완료!!")
            
        }
    }
}