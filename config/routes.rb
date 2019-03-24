Rails.application.routes.draw do
  root 'site#index'
  
  namespace :api do
    resources :bank_accounts, only: %i[index create show update destroy]
  end
end
