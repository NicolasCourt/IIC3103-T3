# README

[PubSub link](https://pubsub.onrender.com)

endpoint: https://pubsub.onrender.com/transaction

## Versions
Rails 6.1.7.3
ruby 3.0.0p0
Postgres 15
Node 14.18.0


## To run locally:

bundle install
yarn install

postgresql running (sudo service postgresql start /  service postgresql start)
redis running (redis-server)
ngrok running (ngrok http 3000 --> type url on base_controller.rb line 48)
rails s