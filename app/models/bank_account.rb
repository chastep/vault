class BankAccount < ApplicationRecord
  has_one :location, dependent: :destroy
end
