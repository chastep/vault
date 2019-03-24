class Api::BankAccountsController < ApplicationController
  before_action :find_bank_acct, only: [:show, :update, :destroy]

  def index
    @bank_accts = BankAccount.order(created_at: :DESC)
    render json: @bank_accts, status: :ok
  end

  def create
    @bank_acct = BankAccount.create(bank_acct_params)
    render json: @bank_acct, status: :created
  end

  def show
    render json: @bank_acct, status: :created
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
