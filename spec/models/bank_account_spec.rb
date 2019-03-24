require 'rails_helper'

RSpec.describe BankAccount, type: :model do
  context 'validations' do
    it { expect(subject).to validate_presence_of :account_number }
    it { expect(subject).to validate_presence_of :routing_number }
    it { expect(subject).to validate_presence_of :location_id }
    it { expect(subject).to belong_to :location }
  end
end
