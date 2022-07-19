import { BoardService } from "./services/board.js"

export class BoardController{
    fetchBoards = (req, res) => {
        // 1. 데이터를 조회하는 로직 -> DB 접속 데이터 꺼내오기
        // const result = [
        //     {number: 1, writer:"철수",title:"철제목",contents:"철내용"},
        //     {number: 2, writer:"영희",title:"영제목",contents:"영내용"},
        //     {number: 3, writer:"훈이",title:"훈제목",contents:"훈내용"}
        // ]
        // 2. 꺼내온 결과 응답 주기
        boardService = new BoardService()
        res.send(result)

        createBoard = (req,res) => {
            console.log(req.body.writer)
            console.log(req.body.title)
            console.log(req.body.contents)

        }
    
    
    }
}