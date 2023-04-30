module Api
  module V1
    class TransactionsController < Api::V1::BaseController

      def post
        puts params
        return render json: { message: "ok"}, status: :ok
      end

      private

      def transaction_params

      end

    end
  end
end

    
