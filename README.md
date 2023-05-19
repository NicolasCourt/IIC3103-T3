# README

[PubSub link](https://pubsub.onrender.com)

endpoint: https://pubsub.onrender.com/transaction

## Versions
Rails 6.1.7.3

ruby 3.0.0

Postgres 12

Node 14.18.0


## To run locally:

app/javascript/components/App.js
app/javascript/components/Data/index.js

in those 2 files uncomment "// const baseUrl = 'http://localhost:3000'" on line 13

bundle install

yarn install

postgresql running (sudo service postgresql start /  service postgresql start)

redis running (redis-server)

ngrok running (ngrok http 3000 --> type https url on app/controllers/api/v1/base_controller.rb line 48)

rails s

[Localhost](http://localhost:3000)

[:)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
