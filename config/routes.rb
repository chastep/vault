Rails.application.routes.draw do
  root to: redirect('bank_accounts')

  get 'bank_accounts', to: 'site#index'
  get 'bank_accounts/new', to: 'site#index'
  get 'bank_accounts/:id', to: 'site#index'
  get 'bank_accounts/:id/edit', to: 'site#index'
  
  namespace :api do
    resources :bank_accounts, only: %i[index create show update destroy]
  end

  get '*unmatched_route', to: 'errors#show', code: 404
end
