FactoryBot.define do
  factory :location do
    sequence(:address) { |n| "#{n} Fake St" }
    address2 { 'Apt 123' }
    city { 'City' }
    region { 'NY' }
    postal { '54321' }
  end
end
