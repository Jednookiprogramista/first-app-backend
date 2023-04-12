
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { db } from "../utils/db";
import jwt from 'jsonwebtoken';

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    name: string;
}

export const registration = (req: Request, res: Response): void => {


    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err: Error, data: User[]) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");


        const salt = genSaltSync(10);
        const hashedPassword = hashSync(req.body.password, salt);

        const q =
            "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name,
        ];

        db.query(q, [values], (err: Error, data: any) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
};

export const login = (req: Request, res: Response): void => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err: Error, data: User[]) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const checkPassword = compareSync(
            req.body.password,
            data[0].password
        );

        if (!checkPassword)
            return res.status(400).json("Wrong password or username");

        const token = jwt.sign({ id: data[0].id }, "secret");

        const { password, ...others } = data[0];

        res
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .status(200)
            .json(others);
    });
};




export const logout = (req: Request, res: Response): void => {
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out.");
};








//
// import { compareSync, genSaltSync, hashSync } from "bcrypt";
// import { Request, Response } from "express";
// import { db } from "../utils/db";
// import jwt from 'jsonwebtoken';
//
// interface User {
//     id: number;
//     username: string;
//     email: string;
//     password: string;
//     name: string;
// }
//
// export const registration = async (req: Request, res: Response): Promise<any> => {
//
//     try {
//         const q = "SELECT * FROM users WHERE username = ?";
//         const [rows] = await db.query(q, [req.body.username]);
//
//         if (rows.length) return res.status(409).json("User already exists");
//
//         const salt = genSaltSync(10);
//         const hashedPassword = hashSync(req.body.password, salt);
//
//         const insertQ =
//             "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)";
//         const values = [
//             req.body.username,
//             req.body.email,
//             hashedPassword,
//             req.body.name,
//         ];
//
//         await db.query(insertQ, [values]);
//         return res.status(200).json("User has been created.");
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };
//
// export const login = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const q = "SELECT * FROM users WHERE username = ?";
//         const [rows] = await db.query(q, [req.body.username]);
//
//         if (rows.length === 0) return res.status(404).json("User not found!");
//
//         const checkPassword = compareSync(
//             req.body.password,
//             rows[0].password
//         );
//
//         if (!checkPassword)
//             return res.status(400).json("Wrong password or username");
//
//         const token = jwt.sign({ id: rows[0].id }, "secret");
//
//         const { password, ...others } = rows[0];
//
//         res
//             .cookie("accessToken", token, {
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: "none"
//             })
//             .status(200)
//             .json(others);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };
//
// export const logout = async (req: Request, res: Response): Promise<any> => {
//     try {
//         res.clearCookie("accessToken",{
//             secure:true,
//             sameSite:"none"
//         }).status(200).json("User has been logged out.");
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };
