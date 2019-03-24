require 'rails_helper'

RSpec.describe Location, type: :model do
  it { expect(subject).to validate_presence_of :address }
  it { expect(subject).to validate_presence_of :city }
  it { expect(subject).to validate_presence_of :bank_account_id }
  it { expect(subject).to belong_to :bank_account }
end
