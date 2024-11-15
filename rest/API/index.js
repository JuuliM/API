import { Router } from "express";
let router = Router();

router.get("/", (req, res) => {
    res.json({
        "hello": "Hello World!"
    })
})

export default router;