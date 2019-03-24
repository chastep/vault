require 'rails_helper'

RSpec.describe BankAccount, type: :model do
  context 'validations' do
    it { expect(subject).to validate_presence_of :account_number }
    it { expect(subject).to validate_presence_of :routing_number }
    it { expect(subject).to have_one :location }
  end
end
