class Api::BankAccountsController < ApplicationController
  before_action :find_bank_acct, only: [:show, :update, :destroy]

  def index
    @bank_accts = BankAccount.order(created_at: :DESC)
    json_response(@bank_accts)
  end

  def create
    @bank_acct = BankAccount.new(bank_acct_params)
    location = Location.find_or_initialize_by(bank_acct_params['location_attributes'])

    if location.valid?
      location.save!
      @bank_acct.location = location
      @bank_acct.save!

      json_response(@bank_acct, :created)
    else
      json_response({ message: 'Invalid parameters' }, :unprocessable_entity)
    end
  end

  def show
    json_response(@bank_acct)
  end

  def update
    @bank_acct.update(bank_acct_params)
    head :no_content
  end

  def destroy
    @bank_acct.destroy
    head :no_content
  end

  private

  def bank_acct_params
    params.require(:bank_account).permit(
      :id,
      :account_number,
      :routing_number,
      :nickname,
      location_attributes: [
        :address,
        :address2,
        :city,
        :postal
      ]
    )
  end

  def find_bank_acct
    @bank_acct = BankAccount.find(params[:id])
  end
end
