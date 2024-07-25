const mongoose = require('mongoose');
const Product = require('./product.model');

const ShipmentSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    shipmentDate: { type: Date },
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
                  return Product.findById(v);
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
