// controllers/productMetaController.js
const ProductMeta =require( "../Model/productMeta");

const getAllProductMeta = async (req, res) => {
  try {
    const metaList = await ProductMeta.find()
    res.json({meta:metaList})
  } catch (error) {
    console.error("Error in getAllProductMeta:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// Create metadata entry
const addProductMeta = async (req, res) => {
  try {
    const { product, manufactureDate, expiryDate, deliveryDate, deliveryTime } = req.body;
    const addedBy = req.user.id; // Ensure you're using auth middleware to set req.user

    const newMeta = new ProductMeta({
      product,
      addedBy,
      manufactureDate,
      expiryDate,
      deliveryDate,
      deliveryTime,
    });

    const savedMeta = await newMeta.save();
    res.status(201).json({ success: true, meta: savedMeta });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get metadata for a product
const getProductMeta = async (req, res) => {
  try {
    const { productId } = req.params;

    const meta = await ProductMeta.findOne({ product: productId }).populate("product addedBy");
    if (!meta) return res.status(404).json({ message: "Metadata not found" });

    res.json({ success: true, meta });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update metadata
const updateProductMeta = async (req, res) => {
  try {
    const { id } = req.params; // meta ID
    const updates = req.body;

    const updatedMeta = await ProductMeta.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedMeta) return res.status(404).json({ message: "Metadata not found" });

    res.json({ success: true, meta: updatedMeta });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete metadata
const deleteProductMeta = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ProductMeta.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Metadata not found" });

    res.json({ success: true, message: "Metadata deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {getAllProductMeta,addProductMeta, getProductMeta, updateProductMeta, deleteProductMeta}