FactoryBot.define do
  factory :location do
    address { '123 Fake St' }
    address2 { 'Apt 42' }
    city { 'City' }
    postal { '54321' }
  end
end
