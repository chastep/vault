class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :address, null: false
      t.string :address2
      t.string :city, null: false
      t.string :postal

      t.timestamps null: true
    end
  end
end
