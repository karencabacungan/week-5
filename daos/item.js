const mongoose = require('mongoose');
const Item = require('../models/item');

module.exports = {};

module.exports.create = async (title, price) => {
    let item = await Item.findOne({
        title: title
    });
    if (item) {
        return false;
    } else {
        try {
            const newItem = await Item.create({
                title: title,
                price: price
            });
            return newItem;
        } catch (e) {
            throw e
        }
    }
};

module.exports.getAll = async () => {
    try {
        const items = await Item.find({}).lean();
        return items;
    } catch (e) {
        throw e;
    }
};

module.exports.getById = async (itemId) => {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        throw new BadDataError('Invalid item id');
    } else {
        try {
            const item = await Item.findOne({
                _id: itemId
            });
            return item;
        } catch (e) {
            throw e;
        }
    }
};

module.exports.updateItem = async (itemId, price) => {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        throw new BadDataError('Invalid item id');
    } else {
        try {
            const updatedItem = await Item.updateOne(
                { _id: itemId },
                { price: price }
            );
            return updatedItem;
        } catch (e) {
            throw e;
        }
    }
};

module.exports.calculateSum = async (items) => {
    try {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            const validId = await mongoose.Types.ObjectId.isValid(items[i]);
            if (validId) {
                const item = await Item.findOne({
                    _id: items[i]
                });
                total = total + item.price;
            } else {
                return undefined;
            }
        }
        return total;
    } catch (e) {
        throw e;
    }
};

class BadDataError extends Error {};
module.exports.BadDataError = BadDataError;