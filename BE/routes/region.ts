import express from "express";
import RegionGroup from "../Models/RegionSchema";

import { STATUS_CODES } from "../constants/statusCodes";
import { REGION_MESSAGES } from "../constants/message";

const regionRouter = express.Router();

regionRouter.get("/region", async (req, res) => {
    try {
        const { regionCode } = req.query;

        const region = await RegionGroup.findOne({regionCode})

        if(!region) {
            res.status(STATUS_CODES.NOT_FOUND).json({ message: REGION_MESSAGES.NOT_FOUND })
            return;
        } 
        res.status(STATUS_CODES.OK).json(region.subRegions)
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: REGION_MESSAGES.FETCH_ERROR })
    }
});

export default regionRouter
