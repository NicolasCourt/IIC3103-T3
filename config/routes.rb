Rails.application.routes.draw do
  get 'render/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'render#index'

  match '*path', to: 'render#index', via: :all
end
