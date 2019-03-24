class BankAccount < ApplicationRecord
  has_one :location, dependent: :destroy

  validates :account_number, presence: true
  validates :routing_number, presence: true
end
