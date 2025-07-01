import express from 'express';
// ✅ Use correct relative path and .js extension
import MenuItems from '../models/menuItems.js';


const router = express.Router();
const VALID_TASTES = ['sweet', 'salty', 'spicy', 'sour'];


// ─────── CRUD ROUTES ─────────

// GET all menu items
router.get('/', async (req, res) => {
    try {
        const items = await MenuItems.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a menu item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await MenuItems.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new menu item
router.post('/', async (req, res) => {
    try {
        const newItem = new MenuItems(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update menu item by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await MenuItems.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE menu item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await MenuItems.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ─────── FILTERING ROUTES ─────────

// GET items by taste only (drink + non-drink)
router.get('/:taste', async (req, res) => {
    const taste = req.params.taste.toLowerCase();

    if (!VALID_TASTES.includes(taste)) {
        return res.status(400).json({ message: `Invalid taste. Must be one of: ${VALID_TASTES.join(', ')}` });
    }

    try {
        const items = await MenuItems.find({ taste });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET items by taste + drink or food filter
// Example: /menuitems/sweet/drink → taste=sweet & is_drink=true
// Example: /menuitems/spicy/food → taste=spicy & is_drink=false
router.get('/:taste/:type', async (req, res) => {
    const taste = req.params.taste.toLowerCase();
    const type = req.params.type.toLowerCase();

    if (!VALID_TASTES.includes(taste)) {
        return res.status(400).json({ message: `Invalid taste. Must be one of: ${VALID_TASTES.join(', ')}` });
    }

    let isDrink;
    if (type === 'drink') isDrink = true;
    else if (type === 'food' || type === 'non-drink') isDrink = false;
    else {
        return res.status(400).json({ message: 'Invalid type. Use "drink", "food", or "non-drink".' });
    }

    try {
        const items = await MenuItems.find({ taste, is_drink: isDrink });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
