class CreateBankAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :bank_accounts do |t|
      t.string :account_number, null: false
      t.string :routing_number, null: false
      t.string :nickname

      t.timestamps null: true
    end
  end
end
