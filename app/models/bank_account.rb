class BankAccount < ApplicationRecord
  belongs_to :location

  validates :account_number, presence: true
  validates :routing_number, presence: true
  validates :location_id, presence: true
end
