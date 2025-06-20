import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBoard extends Document {
  title: string;
  owner: Types.ObjectId;
}

const BoardSchema = new Schema<IBoard>({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.models.Board || mongoose.model<IBoard>("Board", BoardSchema);
