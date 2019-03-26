FactoryBot.define do
  factory :bank_account do
    sequence(:account_number) { |n| "433322211#{n}" }
    routing_number { '011000015' } # federal reserve bank of atlanta routing number
    nickname { 'Test Bank Account' }
    location
  end
end
