import mongoose  from 'mongoose';

const customPanelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
});

const CustomPanel = mongoose.model('CustomPanel', customPanelSchema);

export default CustomPanel;
