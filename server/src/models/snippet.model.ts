import mongoose from "mongoose";

// TODO: define actual snippet schema
const snippetSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    immutable: true
  },
  created_at: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  update_at: {
    type: Date,
    default: () => Date.now()
  },
  deleted_at: Date
});

const Snnipet = mongoose.model("Snippet", snippetSchema);

export {
  Snnipet,
  snippetSchema
}