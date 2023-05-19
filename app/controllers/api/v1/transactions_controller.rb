module Api
  module V1
    class TransactionsController < Api::V1::BaseController

      def create
        read_message(transaction_params)
        head :ok
      end

      def stats
        data = {}

        send = Transaction.where(transType: 2200)
        reverse = Transaction.where(transType: 2400)

        data[:send_amount] = send.length
        data[:reverse_amount] = reverse.length
        data[:send_qty] = send.sum(:amount)
        data[:reverse_qty] = reverse.sum(:amount)
        data[:conciliaciones] = getConciliaciones()
        data[:last_transaction] = Transaction.all.select(:id, :tid, :transType, :originBank, :originAccount, :destinyBank, :destinyAccount, :amount, :messageId, :publishTime).order(publishTime: :desc).limit(100)
        data[:histo] = Transaction.all.select(:amount, :originBank, :destinyBank, :publishTime).group_by { |item| get_group(item[:amount]) }
        data[:ob] = Transaction.select(:originBank).group(:originBank).group_by(&:originBank).keys
        data[:db] = Transaction.select(:destinyBank).group(:destinyBank).group_by(&:destinyBank).keys
        return render json: { data: data }, status: :ok
      end

      def get_group(amount)
        case amount
        when 0...9999
          'Menor a $10.000'
        when 10000...49999
          'Entre $10.000 y $49.999'
        when 50000...99999
          'Entre $50.000 y $99.999'
        when 100000...499999
          'Entre $100.000 y $499.999'
        when 500000...999999
          'Entre $500.000 y $999.999'
        when 1000000...9999999
          'Entre $1.000.000 y $9.999.999'
        else
          'Más de $9.999.999'
        end
      end 

      def getConciliaciones
        conciliaciones = {}
        Transaction.all.each do |transaction|
          next if transaction.originBank == transaction.destinyBank
          if conciliaciones["#{transaction.originBank}-#{transaction.destinyBank}"]
            conciliaciones["#{transaction.originBank}-#{transaction.destinyBank}"] += transaction.amount
          elsif conciliaciones["#{transaction.destinyBank}-#{transaction.originBank}"]
            conciliaciones["#{transaction.destinyBank}-#{transaction.originBank}"] -= transaction.amount
          else
            conciliaciones["#{transaction.originBank}-#{transaction.destinyBank}"] = transaction.amount
          end
        end
        return conciliaciones
      end


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

    
