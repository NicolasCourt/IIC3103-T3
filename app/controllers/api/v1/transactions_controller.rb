module Api
  module V1
    class TransactionsController < Api::V1::BaseController

      def post
        puts params

      end

      private

      def transaction_params

      end

    end
  end
end

    
