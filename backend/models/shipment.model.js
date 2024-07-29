const mongoose = require('mongoose');
const Product = require('./product.model');

const ShipmentStatus = {
  Created: 'created',
  Prepared: 'prepared',
  Shipped: 'shipped',
};

const ShipmentSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    shipmentDate: { type: Date },
    status: {
      type: String,
      enum: Object.values(ShipmentStatus),
      default: ShipmentStatus.Created,
    },
    products: [
      {
        type: new mongoose.Schema(
          {
            product: {
              type: mongoose.ObjectId,
              ref: Product,
              required: true,
              validate: {
                validator: async function (v) {
                  return Product.exists({ _id: v });
                },
                message: (props) => `Product ${props.value} does not exist`,
              },
            },
            quantity: {
              type: Number,
              required: function () {
                return this.quantity > 0;
              },
            },
          },
          { _id: false }
        ),
      },
    ],
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Shipment', ShipmentSchema);
module.exports.ShipmentStatus = ShipmentStatus;
