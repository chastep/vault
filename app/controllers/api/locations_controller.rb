class Api::LocationsController < ApplicationController
  def create
  end

  private

  def bank_acct_params
    params.require(:location).permit(
      :address,
      :address2,
      :city,
      :postal
    )
  end
end
