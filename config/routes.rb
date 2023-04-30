Rails.application.routes.draw do

  root to: 'site#index'
  get '*path', to: 'site#index', via: :all
end
