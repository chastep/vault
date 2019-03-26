require 'faker'

10.times do
  location_hash = {
    address: Faker::Address.street_address,
    address2: Faker::Address.secondary_address,
    city: Faker::Address.city,
    region: Faker::Address.state_abbr,
    postal: Faker::Address.zip_code
  }

  location = Location.create!(location_hash)

  bank_acct_hash = {
    account_number: Faker::Number.number(10),
    routing_number: '011000015',
    nickname: Faker::Company.name,
    location: location
  }

  BankAccount.create!(bank_acct_hash)
end


