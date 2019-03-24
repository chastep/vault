class Api::BankAccountsController < ApplicationController
  before_action :find_bank_acct, only: [:show, :update, :destroy]
  respond_to :json

  def index
    respond_with BankAccount.order(created_at: :DESC)
  end

  def new
    @bank_account = BankAccount.new
    @bank_account.build_location

    respond_with 
  end

  def create
    respond_with :api, BankAccount.create(bank_acct_params)
  end

  def show
    respond_with BankAccount.find(params[:id])
  end

  def update
    bank_acct = BankAccount.find(params['id'])
    bank_acct.update(bank_acct_params)

    respond_with BankAccount, json: bank_acct
  end

  def destroy
    respond_with @bank_acct.destroy
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
  rescue ActiveRecord::RecordNotFound
    flash[:alert] = 'Eye Care Provider Location does not exist!'
    redirect_to url_for(
      controller: 'admin/eye_care_providers',
      action: 'index'
    )
  end
end
