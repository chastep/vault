class BankAccount < ApplicationRecord
  belongs_to :location

  validates :account_number, presence: true
  validates :routing_number, presence: true
  validates :location_id, presence: true
  validate :must_have_valid_routing_number

  accepts_nested_attributes_for :location

  private

  def must_have_valid_routing_number
    valid_number = Adapter::RoutingNumberInfoAdapter.new.lookup(routing_number)

    unless valid_number == routing_number
      errors.add(:routing_number, 'Routing number does not exist')
    end
  end
end
