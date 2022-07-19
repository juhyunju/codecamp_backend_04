export class CouponController{
    constructor(moneyService){
        this.moneyService = moneyService

    }
    buyCoupon = (req,res) => {
        // const cashService = new CashService()
        const hasMoney = this.moneyService.checkValue()
        
        if(hasMoney){
            res.send("쿠폰 구매 완료!!")
            
        }
    }
}