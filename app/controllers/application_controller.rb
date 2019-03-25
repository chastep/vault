class ApplicationController < ActionController::Base
  protect_from_forgery

  include ResponseConcern
  include ExceptionConcern
end
