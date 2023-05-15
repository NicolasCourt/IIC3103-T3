module Api
  module V1
    class TransactionsController < Api::V1::BaseController

      def create
        read_message(transaction_params)
        head :ok
      end

      def stat
        data = {}
        send = Transaction.where(transType: 2200)
        reverse = Transaction.where(transType: 2400)

        data[:send_amount] = send.length
        data[:reverse_amount] = reverse.length

        data[:send_qty] = send.sum(:amount)
        data[:reverse_qty] = reverse.sum(:amount)

        data[:last_transaction] = Transaction.all.order(publishTime: :desc).limit(100)

        data[:histo] = Transaction.all.select(:amount, origin_bank, destiny_bank, publish_time)
        return render json: data, status: :ok
      end

      private

      def read_message(parameters)
        return false if Transaction.find_by(messageId: parameters[:messageId])

        message = Base64.decode64(parameters[:data])
        return false if message.length != 64

        type = message[0..3].to_i
        trans_id = message[4..13].to_i
        return false if Transaction.find_by(tid: trans_id)
        
        origin_bank = message[14..20].to_i
        origin_account = message[21..30].to_i
        destiny_bank = message[31..37].to_i
        destiny_account = message[38..47].to_i
        amount = message[48..63].to_i

        new_transaction = Transaction.new(
          tid: trans_id,
          attributesJson: parameters[:attributes] || {},
          transType: type,
          originBank: origin_bank,
          originAccount: origin_account,
          destinyBank: destiny_bank,
          destinyAccount: destiny_account,
          amount: amount,
          messageId: parameters[:messageId],
          publishTime: DateTime.parse(parameters[:publishTime])
        )
        if new_transaction.save
          puts "done"
        else 
          puts "error"
        end


      end

      def transaction_params
        params.require(:message).permit(:data, :message_id, :messageId, :publish_time, :publishTime, :subscription, :transaction)
      end

    end
  end
end

    
