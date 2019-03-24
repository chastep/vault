FactoryBot.define do
  factory :bank_account do
    account_number { '111222333' }
    routing_number { '123456789' }
    nickname { 'Test Bank Account' }
    location
  end
end
