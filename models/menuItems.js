import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number']
    },
    taste: {
        type: String,
        required: true,
        enum: ["sweet", "salty", "spicy", "sour", "bitter"], // extendable
        lowercase: true
    },
    is_drink: {
        type: Boolean,
        required: true
    },
    ingredients: {
        type: [String],
        required: true,
        validate: {
            validator: function(arr) {
                return arr.length > 0;
            },
            message: 'At least one ingredient is required'
        }
    },
    num_sales: {
        type: Number,
        default: 0,
        min: [0, 'Sales count must be positive or zero']
    }

});

const MenuItems = mongoose.model('MenuItems', menuItemSchema);

export default MenuItems;
