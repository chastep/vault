class ApplicationController < ActionController::Base
  protect_from_forgery
  # protect_from_forgery with: :null_session

  include ResponseConcern
  include ExceptionConcern
end
