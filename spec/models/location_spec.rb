require 'rails_helper'

RSpec.describe Location, type: :model do
  it { expect(subject).to validate_presence_of :address }
  it { expect(subject).to validate_presence_of :city }
  it { expect(subject).to validate_presence_of :region }
  it { expect(subject).to have_one :bank_account }
end
