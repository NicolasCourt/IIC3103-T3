class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.json :attributes
      t.string :data
      t.bigint :messageId
      t.datetime :publishTime

      t.timestamps
    end
  end
end
