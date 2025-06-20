import mongoose, { Document, Schema, Types } from "mongoose";

export interface IList extends Document {
  title: string;
  order: number;
  board: Types.ObjectId;
  cards: Types.ObjectId[];
}

const ListSchema = new Schema<IList>({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
}, { timestamps: true });

export default mongoose.models.List || mongoose.model<IList>("List", ListSchema); 