Rails.application.routes.draw do
  root 'site#index'

  get '*path', to: 'site#index', via: :all
end
