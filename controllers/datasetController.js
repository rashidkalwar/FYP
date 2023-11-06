const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');

const Dataset = require('../models/dataset');
const uploadSingleFile = require('../middleware/fileUpload');

function ExtractData(fileExtension, filePath) {
  let data = [];

  if (fileExtension === '.csv' || fileExtension === '.xlsx') {
    const workbook = XLSX.readFile(filePath);
    const sheetNameList = workbook.SheetNames;

    sheetNameList.forEach((y) => {
      const worksheet = workbook.Sheets[y];
      const headers = {};
      for (z in worksheet) {
        if (z[0] === '!') continue;
        //parse out the column, row, and value
        let tt = 0;
        for (let i = 0; i < z.length; i++) {
          if (!isNaN(z[i])) {
            tt = i;
            break;
          }
        }
        let col = z.substring(0, tt);
        let row = parseInt(z.substring(tt));
        let value = worksheet[z].v;

        //store header names
        if (row == 1 && value) {
          headers[col] = value;
          continue;
        }

        if (!data[row]) data[row] = {};
        data[row][headers[col]] = value;
      }
      //drop those first two rows which are empty
      data.shift();
      data.shift();
    });
  } else if (fileExtension === '.json') {
    data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  } else {
    return res.status(422).send({ message: 'file format not supported!' });
  }

  fs.unlinkSync(filePath);

  return data;
}

// upload a dataset
exports.upload = async (req, res) => {
  uploadSingleFile(req, res, async (err) => {
    if (err) {
      return res.status(422).json({ error: { message: err.message } });
    }

    // console.log(req.body);

    const fileData = req.file;
    const title = req.body ? req.body.title : null;

    if (!title) {
      return res.status(422).json({ error: { message: 'Title is required' } });
    } else if (!fileData) {
      return res
        .status(422)
        .json({ error: { message: 'You must select a file.' } });
    } else {
      const filePath = req.file.path;
      const ext = path.extname(req.file.originalname);
      const data = ExtractData(ext, filePath);
      const user = req.user;

      existingDataset = await Dataset.findOne({
        user: user.userId,
        title: title,
      });

      if (!existingDataset) {
        const dataset = new Dataset({
          user: user.userId,
          title: title,
          description: req.body.description,
          data: data,
        });

        await dataset
          .save()
          .then((result) => {
            res.status(201).send({
              message: 'Dataset created successfully',
              datasetId: result._id,
            });
          })
          .catch((err) => {
            res.status(500).send({
              error: {
                ...err,
                message: 'Error creating Dataset',
              },
            });
          });
      } else {
        return res.status(422).json({
          error: { message: 'Dataset with this title already exists' },
        });
      }
    }
  });
};

// get a dataset
exports.getOne = async (req, res) => {
  const userId = req.user.userId;
  const slug = req.params.slug;
  try {
    const dataset = await Dataset.findOne({ user: userId, slug: slug });
    return res.status(200).json(dataset);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

// get multiple datasets
exports.getMany = async (req, res) => {
  const userId = req.user.userId;
  try {
    const datasets = await Dataset.find({ user: userId }).select(
      '_id title description slug createdAt updatedAt'
    );
    return res.status(200).json(datasets);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

// delete a dataset
exports.delete = async (req, res) => {
  const userId = req.user.userId;
  const slug = req.params.slug;

  existingDataset = await Dataset.findOne({
    user: userId,
    slug: slug,
  });

  if (existingDataset) {
    try {
      await Dataset.deleteOne({ user: userId, slug: slug });
      return res.status(200).json({ message: 'Dataset deleted successfully' });
    } catch (err) {
      return res.status(500).json({ error: { message: err.message } });
    }
  } else {
    return res
      .status(400)
      .json({ error: { message: 'Dataset does not exist' } });
  }
};

// update a dataset
exports.update = async (req, res) => {
  uploadSingleFile(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ error: { message: err.message } });
    }

    const fileData = req.file;
    const title = req.body ? req.body.title : '';
    const description = req.body ? req.body.description : '';
    const slug = req.params.slug;

    if (!title) {
      return res.status(400).send({ error: { message: 'Title is required' } });
    } else if (!fileData) {
      return res
        .status(400)
        .send({ error: { message: 'You must select a file.' } });
    } else {
      const filePath = req.file.path;
      const ext = path.extname(req.file.originalname);
      const data = ExtractData(ext, filePath);
      const userId = req.user.userId;

      existingDataset = await Dataset.findOne({
        user: userId,
        slug: slug,
      });

      if (existingDataset) {
        existingDataset.title = title;
        existingDataset.description = description;
        existingDataset.data = data;

        await existingDataset
          .save()
          .then((result) => {
            res.status(201).send({
              message: 'Dataset updated successfully',
              datasetId: result._id,
              title: result.title,
              slug: result.slug,
              description: result.description,
            });
          })
          .catch((error) => {
            response.status(500).send({
              error: { ...error, message: 'Error updating dataset' },
            });
          });
      } else {
        return res
          .status(400)
          .send({ error: { message: 'Dataset not found!' } });
      }
    }
  });
};
