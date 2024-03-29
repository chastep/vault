class Api::BankAccountsController < ApplicationController
  respond_to :json
  before_action :find_bank_acct, only: [:show, :update, :destroy]

  def index
    @bank_accts = BankAccount.eager_load(:location).order(created_at: :DESC)
    payload = @bank_accts.map { |record| bank_account_payload(record) }

    json_response(payload)
  end

  def create
    @bank_acct = BankAccount.new(bank_acct_params)
    location = Location.new(bank_acct_params['location_attributes'])

    if location.valid?
      location.save!
      @bank_acct.location = location
    end

    if @bank_acct.valid?
      @bank_acct.save!

      json_response(bank_account_payload(@bank_acct), :created)
    else
      validation_errors
    end
  end

  # not used...
  def show
    json_response(@bank_acct)
  end

  def update
    @bank_acct.update_attributes(bank_acct_params)

    if @bank_acct.valid?
      json_response(bank_account_payload(@bank_acct.reload))
    else
      validation_errors 
    end
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
        :id,
        :address,
        :address2,
        :city,
        :region,
        :postal
      ]
    )
  end

  def find_bank_acct
    @bank_acct = BankAccount.find(params[:id])
  end
end
