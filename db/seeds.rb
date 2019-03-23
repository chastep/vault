require 'faker'


10.times do
  bank_acct_hash = {
    account_number: Faker::Number.number(10),
    routing_number: Faker::Number.number(9),
    nickname: Faker::Lorem.word
  }

  bank = BankAccount.create(bank_acct_hash)

  location_hash = {
    address: Faker::Address.street_address,
    address2: Faker::Address.secondary_address,
    city: Faker::Address.city,
    postal: Faker::Address.zip_code,
    bank_account_id: bank.id
  }

  Location.create(location_hash)
end


