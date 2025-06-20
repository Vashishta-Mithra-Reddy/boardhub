import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICard extends Document {
  title: string;
  description?: string;
  order: number;
  list: Types.ObjectId;
  labels?: string[];
  dueDate?: Date;
}

const CardSchema = new Schema<ICard>({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  list: { type: Schema.Types.ObjectId, ref: "List", required: true },
  labels: [{ type: String }],
  dueDate: { type: Date },
}, { timestamps: true });

export default mongoose.models.Card || mongoose.model<ICard>("Card", CardSchema); 