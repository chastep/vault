class Location < ApplicationRecord
  belongs_to :bank_account

  validates :address, presence: true
  validates :city, presence: true
  validates :bank_account_id, presence: true
end
