Rails.application.routes.draw do

  root to: 'site#index'

  namespace :api do
    namespace :v1 do
      post '/transaction', to: 'transaction#post'
    end
  end

  match '*path', to: 'site#index', via: :all
end
