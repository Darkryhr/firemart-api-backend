const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Product = require('../models/Product');
const Category = require('../models/Category');

const isFileValid = (file) => {
  const type = file.type.split('/').pop();
  const validTypes = ['jpg', 'jpeg', 'png', 'pdf'];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(201).json({
    status: 'success',
    result: products.length,
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(201).json({
    message: 'success',
    data: {
      categories,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    message: 'success',
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.addProductImage = catchAsync(async (req, res, next) => {
  // basic setup
  const form = formidable.IncomingForm();
  const uploadFolder = path.join(
    __dirname,
    '../../',
    'client',
    'src',
    'assets'
  );

  // basic config
  form.maxFileSize = 50 * 1024 * 1024;
  form.uploadDir = uploadFolder;

  // parsing
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: 'Fail',
        message: 'There was an error parsing the files',
        error: err,
      });
    }

    const file = files.filekey;
    const isValid = isFileValid(file);

    //create valid name
    const fileName = encodeURIComponent(file.name.replace(/\s/g, '-'));

    if (!isValid) {
      return res.status(400).json({
        status: 'fail',
        message: 'File not valid',
      });
    }

    fs.renameSync(file.path, path.join(uploadFolder, fileName));
  });
});
