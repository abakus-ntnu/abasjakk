import { Schema, model } from 'mongoose';
import { ISettings } from '../types';

const settingsSchema = new Schema<ISettings>({
  tableCount: Number,
});

export default model<ISettings>("Settings", settingsSchema);
