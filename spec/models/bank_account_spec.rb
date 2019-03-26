require 'rails_helper'

RSpec.describe BankAccount, type: :model do
  describe 'validations' do
    it { expect(subject).to validate_presence_of :account_number }
    it { expect(subject).to validate_presence_of :routing_number }
    it { expect(subject).to validate_presence_of :location_id }
    it { expect(subject).to belong_to :location }

    it 'does not allow invalid/unknown routing numbers' do
      invalid_bank_account = build :bank_account, routing_number: '123123123'

      invalid_bank_account.validate

      expect(invalid_bank_account.errors[:routing_number]).to include('is invalid/does not exist')
    end

    it 'does allow valid/known routing numbers' do
      # federal reserve bank of chicago routing number
      # https://www.laneguide.com/findroutingnumbers/103224~CompanyDetails
      invalid_bank_account = build :bank_account, routing_number: '071000301' 

      invalid_bank_account.validate

      expect(invalid_bank_account.errors[:routing_number]).to be_empty
    end
  end
end
