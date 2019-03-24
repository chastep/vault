class Location < ApplicationRecord
  has_many :bank_accounts

  validates :address, presence: true
  validates :city, presence: true
end
