Rails.application.routes.draw do

  root to: 'site#index'

  namespace :api do
    namespace :v1 do
      post '/transaction', to: 'transactions#create'
      get '/status_subscription', to: 'base#status_subscription'
      get '/create_subscription', to: 'base#create_subscription'
      get '/delete_subscription', to: 'base#delete_subscription'
    end
  end

  match '*path', to: 'site#index', via: :all
end
