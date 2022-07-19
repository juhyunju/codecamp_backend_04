import express from 'express'
import { ProductController} from './controllers/product.controller.js'
import { CouponController } from './controllers/coupons.controller.js'
import { BoardController } from './controllers/boards.controller.js'
import { CashService } from './controllers/services/cash.js'
import { ProductService } from './controllers/services/product.js'
import { PointService } from './controllers/services/point.js'
const app = express()

// 서비스 의존성들
const cashService = new CashService()
const productService = new ProductService()  // new 한번으로 모든 곳에서 재사용 가능 ( 싱글톤 패턴)
const pointService = new PointService() // 쿠폰 구매 방식이 포인트결제로 변경됨


// 상품 API 
const productController = new ProductController(pointService,productService)
app.post("/products/buy",productController.buyProduct) // 상품 구매하기
app.post("/products/refund",productController.refundProduct) // 상품 환불하기


// 쿠폰(상품권) API
const couponController = new CouponController(cashService)
app.post("/coupons/buy",couponController.buyCoupon)


// 게시판 API
// const boardController = new BoardController()
// app.get('/boards',boardController.fetchBoards)
// app.post('/boards',boardController.createBoard)

app.listen(3000)