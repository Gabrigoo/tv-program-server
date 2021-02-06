const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require("cors");

const getChannels = require('./channels/getChannels');
const Program = require('./models/program');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/tv-program', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

app.get('/', (req, res) => {

  getChannels(req.query.date, (error, data) => {
    if (error) {
      res.status(504).send(error);
    }
    
    mongoose.connection.collections['programs'].drop();

    const programByChannel = {};
    
    data.channels.forEach((channel) => {

      programByChannel[channel.name] = [];
      channel.programs.forEach(async (current) => {

        const program = new Program({
          channel: channel.name,
          title: current.title,
          start_from: current.start_datetime,
          description: current.short_description,
          age_limit: current.restriction.age_limit
        })

        programByChannel[channel.name].push(program);
        // Saving program into database
        await program.save().catch((e) => console.log(e));
      })
    })
    // Sending data back to client
    res.status(200).send(programByChannel);
  });
});

module.exports = app;