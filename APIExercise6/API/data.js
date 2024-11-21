import { Router } from "express";
import {getData} from "../database.js"
let router = Router();
let getData();

router.get("/", (req, res) => {
    res.json(data)
})

function isJson(req, res, next) {
    if (["POST", "PUT"].includes(req.method) && req.headers["content-type"] !== "application/json") {
        return res.status(415).json({ "error": "Unsupported Media Type" });
    }
    next();
}

router.get("/:id", (req, res) => {
    const user = data.find(b => b.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({"error": "User not found"});
    }
});

router.post("/", isJson, (req, res) => {    
    const { id, Firstname, Lastname } = req.body;
    if (data.find(b => b.id === id)) {
        res.status(409).json({ "error": "record already exists" });
    } else {
        const newUser = { id, Firstname, Lastname };
        data = [...data, newUser];
        res.status(201).json("Created");
    }
});

router.delete("/:id", (req, res) => {    
    const index = data.findIndex(b => b.id === req.params.id)
    if (index === -1) {
        return res.status(404).json({"error": "User not found"})
    }
    data.splice(index, 1);
    res.status(200).json({"message": "Record deleted"})
});

router.put("/:id", isJson, (req, res) => {    
    const {Firstname, Lastname} = req.body;
    const id = req.params.id;

    const index = data.findIndex(b => b.id === id);

    if (index !== -1) {
        data[index] = { id, Firstname, Lastname };
        res.status(200).json(data[index]);
    } else {
        res.status(409).json({ "error": "does not exist" });
    }
});

export default router;