import { Router } from "express";
import jwt from "jsonwebtoken";
let router = Router();

let users = [
    {"username": "jk", "password": "sala"},
    {"username": "pl", "password": "pass"}
]

export const getUsers = () => {
    return users;
}

router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let user;
    if(user = users.find(a => (a.username === username)&&(a.password === password))) {
        const token = jwt.sign({username: username}, "secret_key", {
            expiresIn: "1h"
        });
        user.token = token;
        res.json({
            "username": username,
            "access_token": token,
            "toke_type": "bearer",
            "expires_in": "1h"

        });
    } else
        res.status(401).json({"error": "Login failed"});
})

export default router;