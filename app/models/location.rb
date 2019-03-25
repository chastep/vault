class Location < ApplicationRecord
  has_one :bank_account

  validates :address, presence: true
  validates :city, presence: true
end
