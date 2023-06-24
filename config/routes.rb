Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index, :create, :update] do
        member do
          put :update_counter
        end
      end

      resources :comments, only: [:create, :update]
    end
  end
end
