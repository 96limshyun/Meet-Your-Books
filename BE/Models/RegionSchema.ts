import mongoose, { Schema } from "mongoose";

interface ISubRegion {
    code: string;
    name: string;
}

export interface IRegion extends Document {
    regionCode: string;
    regionName: string;
    subRegions: ISubRegion[];
}

const SubRegionSchema: Schema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
});

const RegionSchema: Schema = new Schema<IRegion>({
    regionCode: { type: String, required: true },
    regionName: { type: String, required: true },
    subRegions: { type: [SubRegionSchema], required: true },
});

const RegionGroup = mongoose.model<IRegion>("RegionGroup", RegionSchema);

export default RegionGroup;
