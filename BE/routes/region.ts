import express from "express";
import RegionGroup from "../Models/RegionSchema";

const regionRouter = express.Router();

regionRouter.get("/region", async (req, res) => {
    try {
        const { regionCode } = req.query;

        const region = await RegionGroup.findOne({regionCode})

        if(!region) {
            res.status(400).json({ message: "없는 지역입니다." })
        } else {
            res.status(200).json(region.subRegions)
        }
    } catch (error) {
        res.status(400).json({ message: "서비지역 불러오기 실패" })
    }
});

export default regionRouter
