class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.bigint :tid
      t.json :attributesJson
      t.bigint :transType
      t.bigint :originBank
      t.bigint :originAccount
      t.bigint :destinyBank
      t.bigint :destinyAccount
      t.bigint :amount
      t.bigint :messageId
      t.datetime :publishTime
      t.timestamps
    end
  end
end
