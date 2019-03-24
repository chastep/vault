Rails.application.routes.draw do
  namespace :api do
    resources :bank_accounts, only: %i[index create show update destroy]
  end
end
