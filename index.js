const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;
const mongoUrl = 'mongodb+srv://goutham_chotu:I0Kj5gHXrDFlb0IG@cluster1.cfvos.mongodb.net/project1';
const dbName = 'project1';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/models');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Connect to MongoDB
let db;
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Database Connected Successfully......!!');
    db = client.db(dbName);
  })
  .catch((err) => console.error('Failed to connect to Database:', err));

// Get an event by its unique ID
app.get('/api/v3/app/events', async (req, res) => {
  const { id, type, limit, page } = req.query;

  try {
    if (id) {
      const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.status(200).json(event);
    }

    if (type === 'latest') {
      const events = await db
        .collection('events')
        .find({})
        .sort({ schedule: -1 })
        .skip((page - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .toArray();
      return res.status(200).json(events);
    }

    res.status(400).json({ message: 'Invalid query parameters' });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Create an event
app.post('/api/v3/app/events', upload.single('image'), async (req, res) => {
  const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;

  if (!name || !tagline || !schedule || !description || !moderator || !category || !sub_category || !rigor_rank) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newEvent = {
    name,
    tagline,
    schedule: new Date(schedule),
    description,
    moderator,
    category,
    sub_category,
    rigor_rank: parseInt(rigor_rank),
    attendees: [],
    image: req.file?.path || null,
  };

  try {
    const result = await db.collection('events').insertOne(newEvent);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Update an event by ID
app.put('/api/v3/app/events/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  if (req.file) {
    updateData.image = req.file.path;
  }

  try {
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully' });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete an event by ID
app.delete('/api/v3/app/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
