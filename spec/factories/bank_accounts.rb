FactoryBot.define do
  factory :bank_account do
    sequence(:account_number) { |n| "433322211#{n}" }
    routing_number { '123456789' }
    nickname { 'Test Bank Account' }
    location
  end
end
