class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session
  # skipping CSRF protection is required here to be able to handle requests for js files
  skip_before_action :verify_authenticity_token

  include ResponseConcern
  include ExceptionConcern
end
