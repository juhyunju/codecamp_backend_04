import express from 'express'
import { ProductController} from './controllers/product.controller.js'
import { CouponController } from './controllers/coupons.controller.js'
import { BoardController } from './controllers/boards.controller.js'
const app = express()


// 게시판 API
const boardController = new BoardController()
app.get('/boards',boardController.fetchBoards)
app.post('/boards',boardController.createBoard)

// 상품 API 
const productController = new ProductController()
app.post("/products/buy",productController.buyProduct) // 상품 구매하기
app.post("/products/refund",productController.refundProduct) // 상품 환불하기


// 쿠폰(상품권) API
const couponController = new CouponController()
app.post("/coupons/buy",couponController.buyCoupon)



app.listen(3000)