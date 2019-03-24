require 'faker'


10.times do
  location_hash = {
    address: Faker::Address.street_address,
    address2: Faker::Address.secondary_address,
    city: Faker::Address.city,
    postal: Faker::Address.zip_code
  }

  location = Location.create(location_hash)

  bank_acct_hash = {
    account_number: Faker::Number.number(10),
    routing_number: Faker::Number.number(9),
    nickname: Faker::Lorem.word,
    location: location
  }

  BankAccount.create(bank_acct_hash)
end


