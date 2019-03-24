class CreateBankAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :bank_accounts do |t|
      t.string :account_number, null: false
      t.string :routing_number, null: false
      t.string :nickname
      t.integer :location_id, null: false

      t.timestamps null: true
    end

    add_index(:bank_accounts, :location_id)
  end
end
