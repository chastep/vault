class ErrorsController < ApplicationController
  def show
    render json: {error: 'bad route here...try again'}, status: 404
  end
end
